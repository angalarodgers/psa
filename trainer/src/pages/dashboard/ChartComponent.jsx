import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Chart from "chart.js/auto";

const ChartComponent = ({ filteredDataTC, todayClasses }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = new Chart(chartRef.current, {
        type: "bar",
        data: {
          labels: ["Total Classes", "Today's Classes"],
          datasets: [
            {
              label: "Number of Classes",
              data: [filteredDataTC, todayClasses],
              backgroundColor: [
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 99, 132, 0.2)",
              ],
              borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      });

      return () => {
        chartInstance.destroy();
      };
    }
  }, [filteredDataTC, todayClasses]);

  return (
    <div>
      <h2>Classes</h2>
      <canvas ref={chartRef} />
    </div>
  );
};

ChartComponent.propTypes = {
  filteredDataTC: PropTypes.number.isRequired,
  todayClasses: PropTypes.number.isRequired,
};

export default ChartComponent;
