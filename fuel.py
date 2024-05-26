import pandas as pd
import plotly.express as px

# Load the data from Google Sheets
url = "https://docs.google.com/spreadsheets/d/1uHoCwqBsbOHKbJ-Y8u9bmoelp3hKsaBGtH5KASkyFEw/export?format=csv&gid=1826645280"
df = pd.read_csv(url)

# Print column names to verify
print(df.columns)

# Assume the correct column name is 'Date and Time' (adjust if necessary)
df['Date and Time'] = pd.to_datetime(df['Date and Time'])
df = df.sort_values('Date and Time')

# Calculate fuel level differences
df['Fuel_Diff'] = df['Fuel Level'].diff()

# Identify refueling events
refuel_threshold = 5  # Define a threshold for refueling detection
df['Refuel_Event'] = df['Fuel_Diff'] > refuel_threshold

# Calculate total fuel filled
total_fuel_filled = df.loc[df['Refuel_Event'], 'Fuel_Diff'].sum()
print(f"Total Fuel Filled: {total_fuel_filled} liters")

# Calculate time difference in hours
df['Time_Diff'] = df['Date and Time'].diff().dt.total_seconds() / 3600

# Calculate fuel consumption rate (only during periods of decrease)
df['Fuel_Consumption'] = df.apply(
    lambda row: -row['Fuel_Diff'] / row['Time_Diff'] if row['Fuel_Diff'] < 0 else 0, axis=1
)

# Average fuel consumption per hour
average_fuel_consumption = df['Fuel_Consumption'].mean()
print(f"Average Fuel Consumption: {average_fuel_consumption} liters per hour")

# Create an interactive line graph
fig = px.line(df, x='Date and Time', y='Fuel Level', title='Fuel Level Over Time')
fig.update_layout(
    xaxis_title='Time',
    yaxis_title='Fuel Level (liters)',
    hovermode='x unified'
)

# Add zoom and pan functionality
fig.update_xaxes(rangeslider_visible=True)
fig.show()
