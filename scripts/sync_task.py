import argparse
import json
import os
from datetime import datetime
import subprocess

# Setup file paths
base_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../docs"))
task_file = os.path.join(base_path, "tasks.json")
archive_file = os.path.join(base_path, "archive.json")

# Parse CLI arguments
parser = argparse.ArgumentParser(description="Manage tasks in tasks.json")
parser.add_argument("--title", help="Title of the task to update/create/delete")
parser.add_argument("--status", help="New status")
parser.add_argument("--note", help="Add or replace notes")
parser.add_argument("--addtag", help="Tag to add")
parser.add_argument("--due", help="Add or update due date (YYYY-MM-DD)")
parser.add_argument("--priority", help="Set priority (low, med, high)")
parser.add_argument("--new", action="store_true", help="Create a new task")
parser.add_argument("--delete", action="store_true", help="Delete a task")
parser.add_argument("--list", action="store_true", help="List all tasks by status")
args = parser.parse_args()

# Load files
def load_json(path):
    if os.path.exists(path):
        with open(path, "r") as f:
            return json.load(f)
    return []

tasks = load_json(task_file)
archive = load_json(archive_file)

def save_and_log():
    with open(task_file, "w") as f:
        json.dump(tasks, f, indent=2)
    with open(archive_file, "w") as f:
        json.dump(archive, f, indent=2)
    subprocess.run(["python", "log_update.py"])

# Create new task
if args.new:
    if not args.title:
        print("❌ Please provide --title for the new task.")
    elif any(t["title"].lower() == args.title.lower() for t in tasks):
        print("❌ Task already exists.")
    else:
        new_task = {
            "title": args.title,
            "status": "todo",
            "notes": args.note or "",
            "tags": [args.addtag] if args.addtag else [],
            "due": args.due or "",
            "priority": args.priority or "med",
            "lastUpdated": datetime.now().strftime("%Y-%m-%d")
        }
        tasks.append(new_task)
        print(f"✅ New task '{args.title}' created.")
        save_and_log()
    exit()

# Delete task
if args.delete:
    if not args.title:
        print("❌ Please provide --title of task to delete.")
    else:
        filtered = [t for t in tasks if t["title"].lower() != args.title.lower()]
        if len(filtered) < len(tasks):
            tasks = filtered
            print(f"🗑️ Task '{args.title}' deleted.")
            save_and_log()
        else:
            print(f"❌ Task '{args.title}' not found.")
    exit()

# List all tasks
if args.list:
    grouped = {}
    for t in tasks:
        grouped.setdefault(t["status"], []).append(t)
    for status, items in grouped.items():
        print(f"\n[{status.upper()}]")
        for task in items:
            title = task["title"]
            due = task.get("due", "")
            prio = task.get("priority", "")
            print(f" - {title} (Due: {due}, Priority: {prio})")
    exit()

# Update task
updated = False
for i, task in enumerate(tasks):
    if task.get("title").lower() == args.title.lower():
        if args.status:
            task["status"] = args.status
        if args.note:
            task["notes"] = args.note
        if args.addtag:
            if "tags" not in task:
                task["tags"] = []
            if args.addtag not in task["tags"]:
                task["tags"].append(args.addtag)
        if args.due:
            task["due"] = args.due
        if args.priority:
            task["priority"] = args.priority
        task["lastUpdated"] = datetime.now().strftime("%Y-%m-%d")

        # Archive if completed
        if args.status == "done":
            archive.append(task)
            del tasks[i]
            print(f"📦 Task '{args.title}' archived.")
        else:
            print(f"✅ Task '{args.title}' updated.")
        updated = True
        break

if updated:
    save_and_log()
else:
    print(f"❌ Task titled '{args.title}' not found.")
