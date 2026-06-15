import os
import re

directories_to_ignore = ['.git', 'node_modules', 'dist', '.gemini']
extensions_to_include = ['.ts', '.tsx', '.js', '.jsx', '.json', '.html', '.md', '.css', '.scss', '.sql', '.example', '.env']

replacements = [
    (re.compile(r'diploy\.in', re.IGNORECASE), 'zonvo.tech'),
    (re.compile(r'Diploy', re.IGNORECASE), 'Zonvo AI'),
    (re.compile(r'AgentLabs', re.IGNORECASE), 'Zonvo AI'),
    (re.compile(r'agentlabs', re.IGNORECASE), 'zonvo'),
]

def process_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception:
        return False
        
    new_content = content
    for pattern, replacement in replacements:
        new_content = pattern.sub(replacement, new_content)
        
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

modified_count = 0
for root, dirs, files in os.walk('.'):
    dirs[:] = [d for d in dirs if d not in directories_to_ignore]
    for file in files:
        if any(file.endswith(ext) for ext in extensions_to_include) or file in ['.env.example', 'LICENSE']:
            filepath = os.path.join(root, file)
            if process_file(filepath):
                modified_count += 1

print(f"Modified {modified_count} files.")
