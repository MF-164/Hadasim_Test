from collections import Counter
from heapq import heappush, heappop, heapify
from itertools import islice

# Generator function that produces parts of the file
def read_file_in_chunks(file_path, chunk_size):
    with open(file_path, 'r') as file:
        while True:
            lines = [file.readline().strip() for _ in range(chunk_size)]
            if all(line == '' for line in lines):
                break
            yield lines

# Counts errors from blocks
def count_errors_in_block(lines):
    error_counter = Counter()
    for line in lines:
        if 'Error: ' in line:
            error_code = line.split('Error: ')[1].strip()
            error_counter[error_code] += 1
    return error_counter

# Main function to find the common errors n top
def process_log_file(file_path, chunk_size, N):
    error_count = Counter()

    # Divide into blocks
    for chunk in read_file_in_chunks(file_path, chunk_size):
        # Error count on each block
        block_counter = count_errors_in_block(chunk)

        # Update the General Counts
        error_count.update(block_counter)

    # Find the most common errors
    min_heap = [(value, key) for key, value in islice(error_count.items(), N)]
    heapify(min_heap)

    for key, value in islice(error_count.items(), N, None):
        if value > min_heap[0][0]:
            heappop(min_heap)
            heappush(min_heap, (value, key))

    return [error_number for value, error_number in min_heap]

# Calling a function with the file, block size, and N most common errors
file_path = 'C:/Users/f0527/Downloads/logs.txt'
chunk_size = 1000 # Number of lines in the block
top_n = 3 # The most common errors

top_errors = process_log_file(file_path, chunk_size, top_n)
print(f'top_errors: {top_errors}')

