#!/usr/bin/env python3
"""Smoke-test ubertradies.online over HTTPS.

One-shot homepage check:
    python3 check_ubertradies_https.py

Homepage plus JSON health endpoint:
    python3 check_ubertradies_https.py --health-url https://ubertradies.online/api/health

Poll until the checks pass:
    python3 check_ubertradies_https.py --watch

The health endpoint, when supplied, must return HTTP 2xx JSON containing:
    {"status": "ok"}
"""
from __future__ import annotations

import argparse
import json
import sys
import time
from dataclasses import dataclass
from datetime import datetime, timezone
from http.client import HTTPResponse
from urllib.error import HTTPError, URLError
from urllib.parse import urlparse
from urllib.request import Request, urlopen

DEFAULT_URL = "https://ubertradies.online/"
# The custom domain currently redirects to this exact Manus deployment alias.
# Keep this allowlist explicit; do not allow arbitrary *.manus.space hosts.
DEFAULT_HOSTS = {
    "ubertradies.online",
    "www.ubertradies.online",
    "ubertradies-pcrm9hzf.manus.space",
}
USER_AGENT = "ubertradies-https-smoke-test/1.0"


@dataclass(frozen=True)
class CheckResult:
    ok: bool
    message: str


def timestamp() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def validate_url(url: str, label: str) -> None:
    parsed = urlparse(url)
    if parsed.scheme != "https" or not parsed.netloc:
        raise ValueError(f"{label} must be an absolute HTTPS URL: {url}")


def read_response(response: HTTPResponse, max_bytes: int = 1_000_000) -> bytes:
    return response.read(max_bytes + 1)


def check_homepage(url: str, expected_hosts: set[str], timeout: float) -> CheckResult:
    request = Request(
        url,
        headers={"accept": "text/html,application/xhtml+xml", "user-agent": USER_AGENT},
    )

    try:
        with urlopen(request, timeout=timeout) as response:
            body = read_response(response)
            status = response.status
            final_url = response.geturl()
    except (HTTPError, URLError, TimeoutError, OSError) as exc:
        return CheckResult(False, f"homepage request failed: {exc}")

    parsed_final_url = urlparse(final_url)
    final_host = (parsed_final_url.hostname or "").lower()

    if parsed_final_url.scheme != "https":
        return CheckResult(False, f"homepage ended on non-HTTPS URL: {final_url}")
    if final_host not in expected_hosts:
        return CheckResult(False, f"homepage ended on unexpected host: {final_host}")
    if status < 200 or status >= 300:
        return CheckResult(False, f"homepage returned HTTP {status}")
    if not body:
        return CheckResult(False, "homepage returned an empty response body")

    return CheckResult(
        True,
        f"homepage passed: HTTP {status}, HTTPS, host {final_host}, "
        f"{len(body)} response bytes",
    )


def check_health(url: str, expected_hosts: set[str], timeout: float) -> CheckResult:
    request = Request(
        url,
        headers={"accept": "application/json", "user-agent": USER_AGENT},
    )

    try:
        with urlopen(request, timeout=timeout) as response:
            body = read_response(response)
            status = response.status
            final_url = response.geturl()
    except (HTTPError, URLError, TimeoutError, OSError) as exc:
        return CheckResult(False, f"health request failed: {exc}")

    parsed_final_url = urlparse(final_url)
    final_host = (parsed_final_url.hostname or "").lower()

    if parsed_final_url.scheme != "https":
        return CheckResult(False, f"health endpoint ended on non-HTTPS URL: {final_url}")
    if final_host not in expected_hosts:
        return CheckResult(False, f"health endpoint ended on unexpected host: {final_host}")
    if status < 200 or status >= 300:
        return CheckResult(False, f"health endpoint returned HTTP {status}")

    try:
        payload = json.loads(body.decode("utf-8"))
    except (UnicodeDecodeError, json.JSONDecodeError) as exc:
        return CheckResult(False, f"health endpoint did not return valid JSON: {exc}")

    if not isinstance(payload, dict) or payload.get("status") != "ok":
        return CheckResult(False, "health JSON did not contain {\"status\": \"ok\"}")

    return CheckResult(True, f"health endpoint passed: HTTP {status}, status=ok")


def check_once(url: str, health_url: str | None, expected_hosts: set[str], timeout: float) -> bool:
    homepage = check_homepage(url, expected_hosts, timeout)
    if homepage.ok:
        print(f"[{timestamp()}] PASS: {homepage.message}")
    else:
        print(f"[{timestamp()}] FAIL: {homepage.message}", file=sys.stderr)
        return False

    if health_url:
        health = check_health(health_url, expected_hosts, timeout)
        if health.ok:
            print(f"[{timestamp()}] PASS: {health.message}")
        else:
            print(f"[{timestamp()}] FAIL: {health.message}", file=sys.stderr)
            return False

    return True


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--url", default=DEFAULT_URL, help=f"homepage URL (default: {DEFAULT_URL})")
    parser.add_argument("--health-url", help="optional HTTPS JSON health URL; must return {\"status\": \"ok\"}")
    parser.add_argument("--expected-host", action="append", dest="expected_hosts", help="allowed final hostname; may be repeated")
    parser.add_argument("--watch", action="store_true", help="poll until checks pass or the timeout expires")
    parser.add_argument("--interval", type=float, default=30, help="seconds between checks in watch mode (default: 30)")
    parser.add_argument("--timeout", type=float, default=300, help="maximum watch duration in seconds (default: 300 / 5 minutes)")
    parser.add_argument("--request-timeout", type=float, default=20, help="timeout for each HTTPS request (default: 20)")
    args = parser.parse_args()

    try:
        validate_url(args.url, "--url")
        if args.health_url:
            validate_url(args.health_url, "--health-url")
    except ValueError as exc:
        parser.error(str(exc))

    expected_hosts = {host.lower() for host in (args.expected_hosts or DEFAULT_HOSTS)}
    if args.interval <= 0 or args.timeout <= 0 or args.request_timeout <= 0:
        parser.error("interval, timeout, and request-timeout must be positive")

    if not args.watch:
        return 0 if check_once(args.url, args.health_url, expected_hosts, args.request_timeout) else 1

    deadline = time.monotonic() + args.timeout
    while True:
        if check_once(args.url, args.health_url, expected_hosts, args.request_timeout):
            return 0
        remaining = deadline - time.monotonic()
        if remaining <= 0:
            print(f"[{timestamp()}] Timed out after {args.timeout:g}s waiting for HTTPS smoke tests to pass.", file=sys.stderr)
            return 1
        time.sleep(min(args.interval, remaining))


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except KeyboardInterrupt:
        print("\nStopped by user.", file=sys.stderr)
        raise SystemExit(130)
