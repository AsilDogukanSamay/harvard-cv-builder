import sys

sys.stdout.reconfigure(encoding='utf-8')

with open("app.js", "r", encoding="utf-8") as f:
    js = f.read()

lines = js.split("\n")

def find_func_lines(func_name):
    print(f"\n=== Function {func_name} ===")
    start = -1
    for i, line in enumerate(lines):
        if f"function {func_name}" in line:
            start = i
            break
    if start != -1:
        for i in range(start, min(start + 40, len(lines))):
            print(f"Line {i+1}: {lines[i]}")
    else:
        print("NOT FOUND!")

find_func_lines("renderEditorExperiences")
find_func_lines("renderEditorEducation")
find_func_lines("renderEditorLeadership")
find_func_lines("renderEditorCertifications")
find_func_lines("renderEditorProjects")
find_func_lines("renderEditorReferences")
find_func_lines("updateExpField")
find_func_lines("updateEduField")
