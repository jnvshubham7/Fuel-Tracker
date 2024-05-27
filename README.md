# Fuel Tracker

Fuel Tracker is a React-based web application designed to analyze and visualize fuel consumption data. It allows users to upload CSV files containing fuel data, and provides various metrics and graphs to help understand fuel consumption patterns over time.

## Deployment

## [View the Deployed Application Here](https://jnvshubham7.github.io/fuel-data-analysis/)

## Features

- **CSV File Upload**: Easily upload a CSV file containing fuel data.
- **Fuel Consumption Metrics**: Display total fuel filled, average fuel consumption, and total refueling events.
- **Interactive Graphs**: Visualize fuel levels and average fuel consumption over time with zoom and pan functionality.
- **Responsive Design**: Adjusts to different screen sizes for optimal viewing.

## Components

### 1. `FileUpload`

A component that handles CSV file uploads using the `PapaParse` library to parse CSV data.

### 2. `FuelGraph`

A component that displays a line chart of the fuel levels over time using `react-chartjs-2` and `chart.js`.

### 3. `AverageFuelConsumptionGraph`

A component that displays a line chart of the average fuel consumption over time using `react-chartjs-2` and `chart.js`.

### 4. `FuelMetricsTable`

A component that displays various fuel consumption metrics in a table format.

### 5. `FuelConsumption`

A component that calculates and displays average fuel consumption.

## Installation

### Prerequisites

- Node.js
- npm

### Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/jnvshubham7/fuel-data-analysis.git
   ```
2. Navigate to the project directory:
   ```sh
   cd fuel-data-analysis
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm start
   ```

## Usage

1. **Upload CSV File**: Click on the "Upload New CSV" button to upload a CSV file containing fuel data. The CSV file should have the following columns: `gpsLedgerId`, `currentFuelLevel`, `isIgnitionOn`, `eventDate`, `eventGeneratedTime`.
2. **View Metrics**: After uploading the file, view the fuel consumption metrics displayed in a table.
3. **Interactive Graphs**: Scroll down to see interactive graphs showing the fuel levels and average fuel consumption over time. Use the mouse to zoom and pan for a detailed view.

## Data Format

The CSV file should have the following columns:

- `gpsLedgerId`: Identifier for the GPS ledger.
- `currentFuelLevel`: The current fuel level at the time of the event.
- `isIgnitionOn`: Whether the ignition is on (true/false).
- `eventDate`: The date of the event (YYYY-MM-DD).
- `eventGeneratedTime`: The timestamp of the event (ISO 8601 format).

Example:

```csv
gpsLedgerId,currentFuelLevel,isIgnitionOn,eventDate,eventGeneratedTime
1,50,true,2024-01-01,2024-01-01T12:00:00Z
1,48,true,2024-01-01,2024-01-01T13:00:00Z
...
```

## File Structure

```plaintext
fuel-data-analysis/
│
├── src/
│   ├── components/
│   │   ├── AverageFuelConsumptionGraph.js
│   │   ├── FileUpload.js
│   │   ├── FuelGraph.js
│   │   ├── FuelMetricsTable.js
│   │
│   ├── data/
│   │   └── data.csv
│   │
│   ├── utils/
│   │   └── calculateAverageFuelConsumption.js
│   │
│   ├── App.js
│   ├── index.js
│
├── .gitignore
├── package.json
├── README.md
```

### Explanation

- `src/`: Contains the source code of the application.
  - `components/`: Contains the React components used in the application.
    - `AverageFuelConsumptionGraph.js`: Component for displaying the average fuel consumption graph.
    - `FileUpload.js`: Component for handling CSV file uploads.
    - `FuelGraph.js`: Component for displaying the fuel level graph.
    - `FuelMetricsTable.js`: Component for displaying fuel consumption metrics in a table.
  - `data/`: Contains initial data files.
    - `data.csv`: Example CSV data file.
  - `utils/`: Contains utility functions.
    - `calculateAverageFuelConsumption.js`: Utility function for calculating average fuel consumption.
  - `App.js`: Main App component that integrates all other components.
  - `index.js`: Entry point of the application.

- `.gitignore`: Specifies files and directories to be ignored by Git.
- `package.json`: Specifies project details and dependencies.
- `README.md`: Contains information about the project.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements.

## Acknowledgements

- [React](https://reactjs.org/)
- [Chart.js](https://www.chartjs.org/)
- [react-chartjs-2](https://github.com/reactchartjs/react-chartjs-2)
- [chartjs-plugin-zoom](https://www.chartjs.org/chartjs-plugin-zoom/latest/)
- [PapaParse](https://www.papaparse.com/)

## Contact

For any questions or suggestions, feel free to open an issue or contact the project maintainer.

---

[GitHub Repository](https://github.com/jnvshubham7/fuel-data-analysis)

[Deployed Application](https://jnvshubham7.github.io/fuel-data-analysis/)
