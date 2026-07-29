with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

lines = html.split("\n")
for i, line in enumerate(lines, 1):
    if "href" in line or "onclick" in line or "login" in line or "register" in line or "editor" in line:
        print(f"index.html Line {i}: {line.strip()[:120]}")
