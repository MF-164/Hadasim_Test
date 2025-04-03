import heapq
from heapq import *
from itertools import islice

error_counts = {}

def find_n_common_errors(log_file, N):
    cnt = 0
    with open(log_file, 'r') as file:
        line = file.readline()
        while line and cnt < 20:
            line = file.readline()
            cnt += 1
            underscore_index = line.rfind('_')
            if underscore_index != -1 :
                num_error = line[underscore_index + 1: -1]

                error_counts[num_error] = error_counts[num_error] + 1 if num_error in error_counts else 1

    min_heap = [(value, key) for key, value in islice(error_counts.items(), N)]

    for key, value in islice(error_counts.items(), N, None):
        if value > min_heap[0][0]:
            heappop(min_heap)
            heappush(min_heap, (value, key))


    return [error_number for value, error_number in min_heap]

print(find_n_common_errors("C:\\Users\\f0527\\Downloads\\logs.txt",3))