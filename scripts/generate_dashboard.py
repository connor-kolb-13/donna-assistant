import os
import json
from datetime import datetime, timedelta
import subprocess

# File paths
base_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../docs"))
task_file = os.path.join(base_path, "tasks.json")
archive_file = os.path.join(base_path, "archive.json")
output_file = os.path.join(base_path, "task_dashboard.md")

# Load JSON
def load_json(path):
    if os.path.exists(path):
        with open(path, "r") as f:
            return json.load(f)
    return []

tasks = load_json(task_file)
archive = load_json(archive_file)

# Timestamps
now = datetime.now()
week_ago = now - timedelta(days=7)

def is_recent(date_str):
    try:
        return datetime.strptime(date_str, "%Y-%m-%d") >= week_ago
    except:
        return False

# Grouping and filters
active_counts = {}
due_soon = []
for t in tasks:
    status = t.get("status", "todo")
    active_counts[status] = active_counts.get(status, 0) + 1

    if t.get("due"):
        try:
            due_date = datetime.strptime(t["due"], "%Y-%m-%d")
            if due_date <= now + timedelta(days=3):
                due_soon.append(t)
        except:
            pass

completed_recently = [a for a in archive if is_recent(a.get("lastUpdated", ""))]

# Markdown Output
lines = []
lines.append(f"# Donna Task Dashboard\n")
lines.append(f"_Last updated: {now.strftime('%Y-%m-%d %H:%M:%S')}_\n")

# Active task summary
lines.append("## Active Task Counts")
for status, count in active_counts.items():
    lines.append(f"- {status.title()}: {count}")
lines.append(f"- Total Active Tasks: {len(tasks)}")
lines.append(f"- Archived Tasks: {len(archive)}")

# Due soon details
lines.append("\n## Tasks Due Soon (next 3 days)")
if due_soon:
    for t in due_soon:
        lines.append(f"- {t['title']} (Due: {t.get('due', 'N/A')}, Priority: {t.get('priority', 'N/A')})")
else:
    lines.append("- No tasks due soon")

# Completed recently
lines.append("\n## Completed in Last 7 Days")
if completed_recently:
    for t in completed_recently:
        lines.append(f"- {t['title']} (Completed: {t.get('lastUpdated', 'N/A')})")
else:
    lines.append("- No recent completions")

# Write file
with open(output_file, "w", encoding="utf-8") as f:
    f.write("\n".join(lines))

# Git commit
try:
    subprocess.run(["git", "add", output_file], check=True)
    subprocess.run(["git", "commit", "-m", "Task dashboard updated"], check=True)
    print("✅ Dashboard updated and committed.")
except subprocess.CalledProcessError:
    print("⚠️ Git commit failed.")
