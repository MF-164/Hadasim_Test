import dask.dataframe as dd
import csv
import os
from collections import defaultdict

def read_file(file_path):
    """Read file from format Parquet or csv"""
    _, file_extension = os.path.splitext(file_path)

    if file_extension.lower() == '.parquet':
        df = dd.read_parquet(file_path)
        return df.rename(columns={'mean_value': 'value'})
    elif file_extension.lower() == '.csv':
        return dd.read_csv(file_path, dtype={'value': 'object'})
    else:
        raise ValueError("Unsupported file format")

def validate_data(df):
    """Validation of data:
            check if each timestamp is date format and unique
            check if each value is numeric type
    """
    df['timestamp'] = dd.to_datetime(df['timestamp'], format='%m/%d/%y %H:%M', errors='coerce')
    df['value'] = dd.to_numeric(df['value'], errors='coerce')
    df = df[df['value'].notnull() & df['timestamp'].notnull()]
    return df

def process_data(data_dict, row):
    """Process of each hour in date calculate sum values and count"""
    hour = row['timestamp'].floor('h')
    date = hour.date()
    time = hour.time()

    data_dict[date][time]['sum'] += row['value']
    data_dict[date][time]['count'] += 1

def calculate_averages(data_dict):
    """Calculate average of hours in date"""
    averages = []
    for date, times in data_dict.items():
        for time, data in times.items():
            if data['count'] > 0:
                avg = data['sum'] / data['count']
                averages.append({'start hour': f"{date} {time}", 'avg': avg})
    return averages

def output_to_csv(data_dict, output_file_path = 'output.csv'):
    """Write Data-dict to csv output.csv file"""
    with open(output_file_path, mode='w', newline='', encoding='utf-8') as file:
        writer = csv.DictWriter(file, fieldnames=['start hour', 'avg'])
        writer.writeheader()
        writer.writerows(data_dict)

def main():
    # Tow format options:
    parquet_file_path = "C:\\Users\\f0527\\Downloads\\time_series (4).parquet"
    csv_file_path = "C:\\Users\\f0527\\Downloads\\times.csv"

    hours_average_par_date_dict = defaultdict(lambda: defaultdict(lambda: {'sum': 0, 'count': 0}))

    data = read_file(csv_file_path)
    data = validate_data(data)

    for index, row in data.iterrows():
        process_data(hours_average_par_date_dict, row)

    # For Stream data:
    # while True:
    #     new_row = get_new_data()  # Function to get new data
    #     process_data(hours_average_par_date_dict, new_row)

    averages = calculate_averages(hours_average_par_date_dict)

    output_to_csv(averages)

if __name__ == "__main__":
    main()
