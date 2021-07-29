import json

with open('passmarkfresh.json', 'r') as f:
    jsondata = json.load(f)

    cpus = jsondata['data']

    cpudesktop = []

    for cpu in cpus:
        if ('desktop' in cpu['platform'] or 'server' in cpu['platform']):
            cpudesktop.append(cpu)

    with open('passmarkdesktop.json', 'w') as w:
        w.write(json.dumps({'data': cpudesktop}, indent=4))
