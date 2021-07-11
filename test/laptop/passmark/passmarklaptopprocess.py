import json
import re

with open('passmarklaptoplatest.json', 'r') as f:
    jsondata = json.load(f)

    cpus = jsondata['data']

    cpulaptop = []

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

        cpulaptop.append(cpu)

    with open('passmarklaptopprocess.json', 'w') as w:
        w.write(json.dumps({'data': cpulaptop}, indent=4))
