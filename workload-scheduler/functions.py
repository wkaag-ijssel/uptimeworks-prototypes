import random
import uuid

def arrayOfTasks(size):
    '''
    Generate a list of tasks

    Parameters:
        size (int):         Number of tasks

    Returns:
        array (list):       List of tasks 
    '''

    def generateTask():
        task = {
            "interval": random.randint(2,4), #task interval, interval must not be larger than number of queues take into account!!
            "duration": random.randint(1,4), #task duration
            "type": random.randint(0,2),     #task type e.g., walking routes
            "id": uuid.uuid4()               #task id (to differentiate between tasks with equal interval, duration and type)
        }
        return task
    
    array = [0] * size
    for i in range(0, size):
        array[i] = generateTask()
    return array


def getTypes(setOfTasks):
    types = []
    for task in setOfTasks:
        if(task['type'] not in types):
            types.append(task['type'])
    return types

def getTasksByType(types, tasks):
    listOfLists = []
    listOfSumDurations = []

    for _type in types:
        listOfTasks = []
        sumDuration = 0
        for task in tasks:
            if(task['type'] == _type):
                listOfTasks.append(task)
                sumDuration += task['duration']
        listOfLists.append(listOfTasks)
        listOfSumDurations.append(sumDuration)

    #Sort the grouped tasks based on the collective task duration in descending order
    #This ensures that the 'largest' group is assigned a start date first.
    #Small groups, or individual ungrouped tasks (not yet regarded), could then fill-in the gaps 
    list1 = list(enumerate(listOfSumDurations))
    sorted_durations = sorted(list1, key=lambda x:x[1])
    sorted_Lists = []
    for index, duration in sorted_durations:
        sorted_Lists.append(listOfLists[index])
    return sorted_Lists