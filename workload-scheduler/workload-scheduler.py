import random
import statistics
import copy
import uuid
import time
import importlib as im
import functions as functions
import algorithm as alg

# Start 
period = 10 
nr_of_tasks = 20 

# Initialize
queues = [0] * period
resources = [x + random.randint(nr_of_tasks/2, nr_of_tasks*1.5) for x in queues]  # probably a better way to do it: but resources scale with the nr. of tasks
tasks = functions.arrayOfTasks(nr_of_tasks)

# Baseline
baseScore = alg.scoring(queues, resources)
print('Start')
print('Initial workload: ' + str(queues))
print('Initial resources: ' + str(resources))
print('Initial score: ' + str(baseScore) + '\n')

# stage 1 - batch scheduling
# create a schedule by finding the best starting date per batch of tasks (=minimizing the performance score)
types = functions.getTypes(tasks)
sorted_tasks = functions.getTasksByType(types, tasks)
scores, workloads, dates, schedule = alg.scheduleWorkloadperBatch(sorted_tasks, queues, resources)
schedule_score = alg.scoring(workloads, resources)

print('Stage 1')
print('Workload: ', workloads, ', with Resources: ', resources)
print('Score: ', schedule_score, '\n')

# stage 2 - task scheduling
# use the schedule (result of stage 1) as basis to move tasks to improve the workload distribution (=further minimize the performance score)
best_schedule, best_workload, start_date, best_score = alg.scheduleWorkloadperTask(schedule, resources, workloads, schedule_score)

print('Stage 2')
print('Workload: ', best_workload, ', with Resources: ', resources)
print('score: ', best_score,'\n')

print(start_date)

for week in best_schedule:
    for task in week:
        print(task)