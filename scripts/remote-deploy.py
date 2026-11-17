#!/usr/bin/env python3
"""Deploy digitalpro on VPS via SSH (one-shot)."""
import os
import sys

import paramiko

HOST = os.environ.get("VPS_HOST", "72.61.167.191")
USER = os.environ.get("VPS_USER", "root")
PASSWORD = os.environ.get("VPS_PASSWORD", "")
SCRIPT_PATH = os.path.join(os.path.dirname(__file__), "deploy-vps.sh")

DEPLOY_CMD = "bash /tmp/deploy-digitalpro.sh"


def main() -> int:
    if not PASSWORD:
        print("VPS_PASSWORD manquant", file=sys.stderr)
        return 1

    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    print(f"Connexion SSH {USER}@{HOST}...")
    client.connect(HOST, username=USER, password=PASSWORD, timeout=30)

    sftp = client.open_sftp()
    remote_script = "/tmp/deploy-digitalpro.sh"
    print(f"Upload {SCRIPT_PATH} -> {remote_script}")
    sftp.put(SCRIPT_PATH, remote_script)
    sftp.chmod(remote_script, 0o755)
    sftp.close()

    print("Execution du deploiement (peut prendre plusieurs minutes)...")
    stdin, stdout, stderr = client.exec_command(
        DEPLOY_CMD,
        get_pty=True,
        timeout=900,
    )
    for line in stdout:
        sys.stdout.buffer.write((line.rstrip() + "\n").encode("utf-8", errors="replace"))
    err = stderr.read().decode()
    if err.strip():
        print(err, file=sys.stderr)
    exit_code = stdout.channel.recv_exit_status()
    client.close()
    print(f"Exit code: {exit_code}")
    return exit_code


if __name__ == "__main__":
    raise SystemExit(main())
