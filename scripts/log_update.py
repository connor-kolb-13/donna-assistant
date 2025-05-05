import json
import os
from datetime import datetime
from deepdiff import DeepDiff
import subprocess

# Paths
base_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../docs"))
task_file = os.path.join(base_path, "tasks.json")
backup_file = os.path.join(base_path, "tasks_backup.json")
changelog = os.path.join(base_path, "changelog.md")

# Load current and backup task states
with open(task_file, "r") as f:
    current = json.load(f)

if os.path.exists(backup_file):
    with open(backup_file, "r") as f:
        previous = json.load(f)
else:
    previous = {}

# Compute difference
diff = DeepDiff(previous, current, ignore_order=True)
now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

# Format log entry
log_entry = f"\n## {now}\n"

if not diff:
    log_entry += "- No changes detected.\n"
else:
    for key in diff:
        for change in diff[key]:
            log_entry += f"- {key}: {diff[key][change]}\n"

# Append to changelog
with open(changelog, "a", encoding="utf-8") as f:
    f.write(log_entry)

# Save current state as new backup
with open(backup_file, "w", encoding="utf-8") as f:
    json.dump(current, f, indent=2)

print("✅ Log complete. Changes written to changelog.md.")

# Auto-commit using Git
if diff:
    try:
        subprocess.run(["git", "add", task_file, backup_file, changelog], check=True)
        subprocess.run(["git", "commit", "-m", "🔁 Task log update — auto commit from logger"], check=True)
        print("✅ Auto-commit complete.")
    except subprocess.CalledProcessError:
        print("⚠️ Git auto-commit failed. Make sure you're in a Git repo and nothing is locked.")
