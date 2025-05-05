import os
import json
from datetime import datetime, timedelta
import subprocess

# Paths
base_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../docs"))
task_file = os.path.join(base_path, "tasks.json")
archive_file = os.path.join(base_path, "archive.json")
output_file = os.path.join(base_path, "weekly_summary.md")

# Load JSON
def load_json(path):
    if os.path.exists(path):
        with open(path, "r") as f:
            return json.load(f)
    return []

tasks = load_json(task_file)
archive = load_json(archive_file)

# Time helpers
today = datetime.now()
week_start = today - timedelta(days=7)

def is_this_week(date_str):
    try:
        dt = datetime.strptime(date_str, "%Y-%m-%d")
        return dt >= week_start
    except:
        return False

# Count active tasks
active_counts = {}
for t in tasks:
    active_counts[t["status"]] = active_counts.get(t["status"], 0) + 1

# Count archived/completed this week
completed_this_week = [a for a in archive if is_this_week(a.get("lastUpdated", ""))]
created_this_week = [t for t in tasks if is_this_week(t.get("lastUpdated", ""))]

# Markdown summary
lines = []
lines.append(f"# Weekly Summary ({today.strftime('%Y-%m-%d')})\n")

lines.append("## Active Tasks")
if active_counts:
    for status, count in active_counts.items():
        lines.append(f"- {status.title()}: {count}")
else:
    lines.append("- No active tasks")

lines.append("\n## Completed This Week")
if completed_this_week:
    for t in completed_this_week:
        lines.append(f"- {t['title']} (Due: {t.get('due', 'N/A')})")
else:
    lines.append("- No tasks completed this week")

lines.append("\n## Created This Week")
if created_this_week:
    for t in created_this_week:
        lines.append(f"- {t['title']} (Due: {t.get('due', 'N/A')})")
else:
    lines.append("- No new tasks this week")

# Write output
with open(output_file, "w", encoding="utf-8") as f:
    f.write("\n".join(lines))

# Git commit
try:
    subprocess.run(["git", "add", output_file], check=True)
    subprocess.run(["git", "commit", "-m", "Weekly summary updated"], check=True)
    print("✅ Weekly summary updated and committed.")
except subprocess.CalledProcessError:
    print("⚠️ Git commit failed.")
