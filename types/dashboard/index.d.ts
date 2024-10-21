export const chartOptions: ChartOptions<"line"> = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "#1F2937",
        usePointStyle: true,
        padding: 10,
        font: {
          size: 14,
          weight: "bold"
        },
        boxWidth: 10,
        boxHeight: 10
      }
    }
  },
  scales: {
    x: {
      ticks: {
        color: "#1F2937"
      },
      grid: {
        color: "#D1D5DB"
      }
    },
    y: {
      ticks: {
        color: "#1F2937" // Gray 800
      },
      grid: {
        color: "#D1D5DB"
      }
    }
  }
};
