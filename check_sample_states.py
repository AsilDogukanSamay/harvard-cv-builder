with open("app.js", "r", encoding="utf-8") as f:
    js = f.read()

import re

tr_match = re.search(r"const TR_SAMPLE_STATE = (\{.*?\n\};)", js, re.DOTALL)
if tr_match:
    print("--- TR_SAMPLE_STATE ---")
    print(tr_match.group(1)[:500])

en_match = re.search(r"const EN_SAMPLE_STATE = (\{.*?\n\};)", js, re.DOTALL)
if en_match:
    print("--- EN_SAMPLE_STATE ---")
    print(en_match.group(1)[:500])
