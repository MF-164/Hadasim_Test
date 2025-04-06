import dask.dataframe as dd
import csv
import os


def read_file(file_path):
    _, file_extension = os.path.splitext(file_path)

    if file_extension.lower() == '.parquet':
        df = dd.read_parquet(file_path)
        return df.rename(columns={'mean_value': 'value'})
    elif file_extension.lower() == '.csv':
        return dd.read_csv(file_path, dtype={'value': 'object'})
    else:
        raise ValueError("Unsupported file format")


def validate_and_clean_data(df):
    df['timestamp'] = df['timestamp'].drop_duplicates()
    df['timestamp'] = dd.to_datetime(df['timestamp'], format='%m/%d/%y %H:%M', errors='coerce')

    df['value'] = dd.to_numeric(df['value'], errors='coerce')
    df = df[df['value'].notnull()]
    df = df[df['timestamp'].notnull()]

    return df


def build_date_hour_dict(df):
    result = {}

    for index, row in df.iterrows():
        hour = row['timestamp'].floor('h')
        date = hour.date()
        time = hour.time()

        if date not in result:
            result[date] = {}
        if time not in result[date]:
            result[date][time] = {'sum': 0, 'count': 0}

        result[date][time]['sum'] += row['value']
        result[date][time]['count'] += 1

    return result


def calculate_hourly_averages(hour_data):
    averages = {}
    for date, times in hour_data.items():
        for time, data in times.items():
            if data['count'] > 0:
                averages[(date, time)] = data['sum'] / data['count']
    return averages


def process_data_to_dict(df):
    df = validate_and_clean_data(df)

    date_dict = build_date_hour_dict(df)

    average_of_date = calculate_hourly_averages(date_dict)

    result = []
    for (date, time), avg in average_of_date.items():
        result.append({'start hour': f"{date} {time}", 'avg': avg})

    return result


def output_to_csv(data_dict):
    with open('output.csv', mode='w', newline='', encoding='utf-8') as file:
        writer = csv.DictWriter(file, fieldnames=['start hour', 'avg'])
        writer.writeheader()
        writer.writerows(data_dict)


def main():
    parquet_file_path = "C:\\Users\\f0527\\Downloads\\time_series (4).parquet"
    csv_file_path = "C:\\Users\\f0527\\Downloads\\times.csv"

    data = read_file(parquet_file_path)

    data_dict = process_data_to_dict(data)

    output_to_csv(data_dict)


if __name__ == "__main__":
    main()


