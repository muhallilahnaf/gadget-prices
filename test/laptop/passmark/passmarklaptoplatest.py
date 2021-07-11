import json

with open('passmarklaptop.json', 'r') as f:
    jsondata = json.load(f)

    cpus = jsondata['data']

    cpulaptop = []

    for cpu in cpus:
        date = cpu['date']
        if ('2015' in date or '2016' in date or '2017' in date or '2018' in date or '2019' in date or '2020' in date or '2021' in date):
            cpulaptop.append(cpu)

    with open('passmarklaptoplatest.json', 'w') as w:
        w.write(json.dumps({'data': cpulaptop}, indent=4))
