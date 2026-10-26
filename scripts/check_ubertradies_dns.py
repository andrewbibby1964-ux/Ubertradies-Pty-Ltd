#!/usr/bin/env python3
"""Check ubertradies.online's apex A records against Vercel's expected IP.

One-shot check:
    python3 check_ubertradies_dns.py

Poll until an exact match (every 60 seconds, for up to 30 minutes):
    python3 check_ubertradies_dns.py --watch

Only the root A-record set is checked. This does not verify a Vercel project
association, DNSSEC, AAAA records, HTTPS, or site health.
"""

from __future__ import annotations

import argparse
import json
import sys
import time
from datetime import datetime, timezone
from urllib.error import URLError
from urllib.parse import urlencode
from urllib.request import Request, urlopen

DOMAIN = "ubertradies.online"
EXPECTED_A = {"76.76.21.21"}
DNS_GOOGLE_URL = "https://dns.google/resolve"


def query_a_records(timeout: float) -> tuple[set[str], int]:
    """Return (IPv4 answer set, DNS response status) via Google's DoH API."""
    query = urlencode({"name": DOMAIN, "type": "A"})
    request = Request(
        f"{DNS_GOOGLE_URL}?{query}",
        headers={
            "accept": "application/dns-json",
            "user-agent": "ubertradies-dns-check/1.0",
        },
    )
    with urlopen(request, timeout=timeout) as response:
        payload = json.load(response)

    status = int(payload.get("Status", -1))
    addresses = {
        answer["data"]
        for answer in payload.get("Answer", [])
        if answer.get("type") == 1 and isinstance(answer.get("data"), str)
    }
    return addresses, status


def timestamp() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def check_once(timeout: float) -> bool:
    try:
        actual, dns_status = query_a_records(timeout)
    except (URLError, TimeoutError, OSError, json.JSONDecodeError) as exc:
        print(f"[{timestamp()}] DNS lookup failed: {exc}", file=sys.stderr)
        return False

    actual_text = ", ".join(sorted(actual)) if actual else "(no A records)"
    expected_text = ", ".join(sorted(EXPECTED_A))
    if actual == EXPECTED_A:
        print(f"[{timestamp()}] PASS: {DOMAIN} A records exactly match {expected_text}.")
        return True

    print(
        f"[{timestamp()}] MISMATCH: {DOMAIN} A records are {actual_text}; "
        f"expected exactly {expected_text} (DNS status {dns_status}).",
        file=sys.stderr,
    )
    return False


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--watch",
        action="store_true",
        help="poll until the A-record set matches or the timeout expires",
    )
    parser.add_argument(
        "--interval",
        type=float,
        default=60,
        help="seconds between checks in watch mode (default: 60)",
    )
    parser.add_argument(
        "--timeout",
        type=float,
        default=1800,
        help="maximum watch duration in seconds (default: 1800 / 30 minutes)",
    )
    parser.add_argument(
        "--request-timeout",
        type=float,
        default=10,
        help="timeout in seconds for each DNS-over-HTTPS request (default: 10)",
    )
    args = parser.parse_args()

    if args.interval <= 0 or args.timeout <= 0 or args.request_timeout <= 0:
        parser.error("interval, timeout, and request-timeout must be positive")

    if not args.watch:
        return 0 if check_once(args.request_timeout) else 1

    deadline = time.monotonic() + args.timeout
    while True:
        if check_once(args.request_timeout):
            return 0
        remaining = deadline - time.monotonic()
        if remaining <= 0:
            print(
                f"[{timestamp()}] Timed out after {args.timeout:g}s waiting for "
                f"{DOMAIN} A records to equal {', '.join(sorted(EXPECTED_A))}.",
                file=sys.stderr,
            )
            return 1
        time.sleep(min(args.interval, remaining))


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except KeyboardInterrupt:
        print("\nStopped by user.", file=sys.stderr)
        raise SystemExit(130)
