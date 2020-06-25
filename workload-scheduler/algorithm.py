import copy 
import statistics
import functions as functions

# General
def scoring(qes, res):
    '''
    The evaluation method

    Parameters:
        qes (list):         The workload
        res (list):         The resources 

    Returns:
        score (float):      The score of this workload

    '''

    diff = []
    for queue, resource in zip(qes, res):
        diff.append(resource-queue)
    score = statistics.stdev(diff)

    '''
    Idea: resource surplus- or shortage-oriented metric.
    Idea: short-term oriented score. Resource shortage later-on is of lesser importance, than a shortage next week.
    Idea: additional to score, add breaking conditions (e.g., safety, downtime, idk)

          filter tasks with 'breaking conditions':
                at stage 2:
                    begin with relocating these tasks, as their options are limited:
                        distribute the 'rest' of the tasks to minimize any resource shortages.

    Idea: at stage 2, aim to find startdates at weeks with tasks of same type.
        
        evaluate tasks in queue:
            if any has type of selected task:
                calculate score 
            else:
                breaking condition
                or
                penalty to score

    '''
    return score

def calculateWorkload(start_date, workload, batch):
    '''
    Calculated workload

    Parameters:
        start_date (int):   The date of the tasks
        workload (list):    The summed task duration per queue
        batch (list):       The batch of task(s)

    Returns:
        newWorkload (list): The new workload       
    '''

    newWorkload = copy.deepcopy(workload)      
    for task in batch:  
        date = start_date                
        while date < len(workload):                                            # update workload for the subsequent tasks within the selected period
            newWorkload[date] += task['duration']
            date += task['interval']
    return newWorkload

# Stage 1
def scheduleWorkloadperBatch(batches, queues, resources):    
    '''
    Stage 1 - creating a new schedule per batch

    Parameters:
        batches (list):             Batches of tasks. Each batch contains tasks with the same 'type' 
        queues (list):              The workload. Each queue represents a week. The initial workload is 0.
        resources(list):            Resources

    Returns:
        batchScores (list):         Scores of each batch (not used)
        bestWorkload (list):        The workload of best schedule
        batchStartDates (list):     The start dates of each batch (not used)
        planning (list):            The new schedule resulting from batch-scheduling.
    '''
    def getMaxInterval(setOfTasks):
        interval = 0
        for task in setOfTasks:
            if(task['interval'] > interval):
                interval = task['interval']
        return interval

    def addTasks(planning, tasks, date):
        newPlanning = copy.deepcopy(planning)
        for task in tasks:
            task['startdate'] = date
            newPlanning[date].append(task)
            next_date = date + task['interval']
            while next_date < len(newPlanning):
                newPlanning[next_date].append(task)
                next_date = next_date + task['interval']
        return newPlanning 

    batchScores = []
    batchWorkloads = []
    batchStartDates = []
    planning = [[] for i in range(len(queues))]
    currentQueue = None

    # for each type
    for batch in batches:
        # find longest interval within the batch
        maxInterval = getMaxInterval(batch)
        bestScore = None

        # either use the starting workload, or use the start workload + workload of prev. batches
        if(not currentQueue):
            currentQueue = copy.deepcopy(queues)
        else:
            currentQueue = copy.deepcopy(bestWorkload)

        # for each possible starting date ranging from this week - till week (0 + max. interval)
        for startdate in range(0, maxInterval):
            newWorkload = calculateWorkload(startdate, currentQueue, batch)         # calculate the new workload by adding the batch at the startdate
            score = scoring(newWorkload, resources) 

            # remember startdate with best workload division
            if(not bestScore or bestScore > score):
                bestScore = score
                bestWorkload = newWorkload
                bestStartDate = startdate

        # log best score / workload / start date per batch
        batchScores.append(bestScore)
        batchWorkloads.append(bestWorkload)
        batchStartDates.append(bestStartDate)

        # Add tasks to distribution of tasks
        planning = addTasks(planning, batch, bestStartDate)

    return batchScores, bestWorkload, batchStartDates, planning



def scheduleWorkloadperTask(sched, res, base_workload, score):
    '''
    Stage 2 - creating a new schedule by iteratively testing the impact of different startdates for individual tasks.

    Parameters:
        sched (list):               The schedule resulting from batch-scheduling the tasks (stage 1). 
                                    A list containing lists of dicts. Each dict being a task.
        res (list):                 The resources
        base_workload(list):        The workload resulting from batch-scheduling the tasks (stage 1). 
        score (float):              The score of the base_workload

    Returns:
        sched (list):               The new schedule resulting from task-scheduling. 
        best_workload (list):       The new workload resulting from the planning
        start_date (int):           
        score (float):              The score of the workload
    '''

    # recalculate the workload - minus the workload of the 'task' - check
    def reCalcWorkload(schedule, task):
        _id = task['id']
        i = 0
        sum_workload = 0
        workload = [0] * len(schedule)
        for queue in schedule:
            for item in queue:
                sum_workload += item['duration']
                if(item['id'] != _id):
                    workload[i] += item['duration']
            i += 1
        return workload        

    # change planning
    def changePlanning(planning, changed_task, date):
        for queue in planning:                          # step 1: remove the task
            for task in queue:
                if task['id'] == changed_task['id']:
                    queue.remove(task)

        while(date < len(planning)):                    # step 2: add the task (based on the new date)
            planning[date].append(changed_task)
            date += changed_task['interval']
        return planning

    # shortage resource
    def hasResourceShortage(queue, resource):
        workload = 0
        for task in queue:
            workload += task['duration']
        net = resource - workload
        if(net < 0):
            return True
        else:
            return False

    # limit
    def withinLimit(q, index):
        if(index < len(q)):
            return True
        else:
            return False
    
    def findNewStartDate(date, task, workload, workload_opt, score):
        for new_date in range(0, task['interval']-1):
                new_workload = calculateWorkload(new_date, workload, [task])
                new_score = scoring(new_workload, res)
                if(new_score < score):              
                    print('possible workload: ', new_workload, 'has score: ', new_score)
                    print('by moving: ', task)
                    workload_opt = new_workload
                    date = new_date
                    score = new_score
        return date, workload_opt, score

    best_workload = base_workload
    for q in range(len(sched)):
        i = 0
        queue = sched[q]
        while(hasResourceShortage(queue, res[q]) and withinLimit(queue, i)):
            workload_without_task = reCalcWorkload(sched, queue[i])
            start_date, best_workload, score = findNewStartDate(queue[i]['startdate'], queue[i], workload_without_task, best_workload, score)
            sched = changePlanning(sched, queue[i], start_date)
            queue[i]['startdate'] = start_date
            i += 1
    return sched, best_workload, start_date, score