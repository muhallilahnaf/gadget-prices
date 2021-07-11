import json

with open('passmarkfresh.json', 'r') as f:
    jsondata = json.load(f)

    cpus = jsondata['data']

    cpulaptop = []

    for cpu in cpus:
        if ('laptop' in cpu['platform']):
            cpulaptop.append(cpu)

    with open('passmarklaptop.json', 'w') as w:
        w.write(json.dumps({'data': cpulaptop}, indent=4))
