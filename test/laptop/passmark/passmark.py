import json
import re


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


yearlist = ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022']


def findLatest(date, yearlist):
    for year in yearlist:
        if year in date:
            return True
    return False


def getRawname(name):
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

    return name.lower()


with open('passmark.json', 'r') as f:
    jsondata = json.load(f)
    cpus = jsondata['data']

    fresh = []
    cpulaptop = []
    cpudesktop = []
    cpulaptoplatest = []
    kountPlatform = []
    kountCore = []
    kountThread = []
    kountTdp = []
    kountPlatformDict = {}

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

        rawname = getRawname(name)

        cpuobj = {
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
            'rawname': rawname
        }

        fresh.append(cpuobj)

        if ('desktop' in platform or 'server' in platform):
            cpudesktop.append(cpuobj)

        if ('laptop' in platform):
            cpulaptop.append(cpuobj)
            if (findLatest(date, yearlist)):
                cpulaptoplatest.append(cpuobj)

        # counting
        if (platform not in kountPlatform):
            kountPlatform.append(platform)

        if (core not in kountCore):
            kountCore.append(core)

        if (thread not in kountThread):
            kountThread.append(thread)

        if (tdp not in kountTdp):
            kountTdp.append(tdp)

        if (platform not in kountPlatformDict):
            kountPlatformDict[platform] = 1
        else:
            kountPlatformDict[platform] = kountPlatformDict[platform] + 1

        kountobj = {
            'kountPlatform': kountPlatform,
            'kountCore': kountCore,
            'kountThread': kountThread,
            'kountTdp': kountTdp,
            'kountPlatformDict': kountPlatformDict
        }

    with open('passmarkfresh.json', 'w') as w1:
        s1 = json.dumps({'data': fresh}, indent=4)
        w1.write(s1)

        with open('passmarkdesktop.json', 'w') as w2:
            s2 = json.dumps({'data': cpudesktop}, indent=4)
            w2.write(s2)

            with open('passmarklaptop.json', 'w') as w3:
                s3 = json.dumps({'data': cpulaptop}, indent=4)
                w3.write(s3)

                with open('passmarklaptoplatest.json', 'w') as w4:
                    s4 = json.dumps({'data': cpulaptoplatest}, indent=4)
                    w4.write(s4)

                    with open('passmarkcount.json', 'w') as w5:
                        s5 = json.dumps(kountobj, indent=4)
                        w5.write(s5)
