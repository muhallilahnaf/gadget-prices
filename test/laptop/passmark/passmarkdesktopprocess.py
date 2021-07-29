import json
import re

with open('passmarkdesktop.json', 'r') as f:
    jsondata = json.load(f)

    cpus = jsondata['data']

    cpudesktop = []

    for cpu in cpus:
        name = cpu['name']

        name = re.sub(r'AMD', '', name)
        name = re.sub(r'APU', '', name)
        name = re.sub(r'SOC', '', name)
        name = re.sub(r'Intel Core', '', name)
        name = re.sub(r'Atom', '', name)
        name = re.sub(r'Pentium', '', name)
        name = re.sub(r'Celeron', '', name)
        name = re.sub(r'Intel', '', name)
        name = re.sub(r'@ \d\.\d\dGHz', '', name)
        name = re.sub(r'\d+MHz', '', name)
        name = re.sub(r'[\s\-]*', '', name)

        cpu['rawname'] = name.lower()

        cpudesktop.append(cpu)

    with open('passmarkdesktopprocess.json', 'w') as w:
        w.write(json.dumps({'data': cpudesktop}, indent=4))
