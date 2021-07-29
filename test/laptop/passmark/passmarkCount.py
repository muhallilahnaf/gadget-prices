import json
with open('passmarkfresh.json', 'r') as f:
    jsondata = json.load(f)

    cpus = jsondata['data']

    platform = []
    core = []
    thread = []
    tdp = []
    platformDict = {}

    for cpu in cpus:
        if (cpu['platform'] not in platform):
            platform.append(cpu['platform'])

        if (cpu['core'] not in core):
            core.append(cpu['core'])

        if (cpu['thread'] not in thread):
            thread.append(cpu['thread'])

        if (cpu['tdp'] not in tdp):
            tdp.append(cpu['tdp'])

        if (cpu['platform'] not in platformDict):
            platformDict[cpu['platform']] = 1
        else:
            platformDict[cpu['platform']] = platformDict[cpu['platform']] + 1

print('platform: ', platform)
print('core: ', core)
print('thread: ', thread)
print('tdp: ', tdp)
print('platformDict: ', platformDict)
