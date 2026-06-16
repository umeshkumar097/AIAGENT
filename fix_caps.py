import os

files = [
    'client/src/contexts/plugin-registry.tsx',
    'client/src/components/plugin-bootstrapper.tsx',
    'client/src/hooks/use-toast.ts',
    'client/src/main.tsx'
]

for filepath in files:
    with open(filepath, 'r') as f:
        content = f.read()
    new_content = content.replace('__AgentLabs_', '__AGENTLABS_')
    with open(filepath, 'w') as f:
        f.write(new_content)
