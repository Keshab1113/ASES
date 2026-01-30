import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { getIndicatorTrends } from "../api/analytics.api";

export default function Analytics() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    getIndicatorTrends().then((res) => {
      const labels = [...new Set(res.data.map(d => d.date))];

      setChartData({
        labels,
        datasets: [
          {
            label: "Leading",
            data: res.data.filter(d => d.indicator_type === "leading").map(d => d.count),
          },
          {
            label: "Lagging",
            data: res.data.filter(d => d.indicator_type === "lagging").map(d => d.count),
          },
        ],
      });
    });
  }, []);

  if (!chartData) return null;

  return <Line data={chartData} />;
}
