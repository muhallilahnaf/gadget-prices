import json


def processData(text, number):
    if (isinstance(text, str)):
        if (text.lower() == 'na' or text.lower() == 'unknown' or text == ''):
            text = ''
            return text
        else:
            if (number):
                text = text.replace(',', '')
                text = int(float(text))
            return text
    else:
        text = str(text)
        processData(text, number)


with open('passmark.json', 'r') as f:
    jsondata = json.load(f)

    cpus = jsondata['data']

    fresh = []

    for cpu in cpus:
        name = processData(cpu['name'], False)
        date = processData(cpu['date'], False)
        socket = processData(cpu['socket'], False)
        platform = processData(cpu['cat'], False)
        platform = platform.lower()

        tdp = processData(cpu['tdp'], True)
        base = processData(cpu['speed'], True)
        turbo = processData(cpu['turbo'], True)

        core = processData(cpu['cores'], True)
        thread = processData(cpu['logicals'], True)
        if (thread == 1):
            thread = core
        if (thread == 2 and isinstance(core, int)):
            thread = core * 2

        passmark = processData(cpu['cpumark'], True)

        link = cpu['href'].replace('amp;', '')
        link = f"https://www.cpubenchmark.net/cpu.php?cpu={link}"

        fresh.append({
            'name': name,
            'date': date,
            'socket': socket,
            'platform': platform,
            'tdp': tdp,
            'base': base,
            'turbo': turbo,
            'core': core,
            'thread': thread,
            'passmark': passmark,
            'link': link,
        })

    with open('passmarkfresh.json', 'w') as w:
        s = json.dumps({'data': fresh}, indent=4)
        w.write(s)
