import Chart from '@/components/chart/chart';
import useChart from '@/components/chart/useChart';

const series = [100, 58, 54, 44, 47, 43, 10];

export default function ChartBar_Up_Fans() {
  const chartOptions = useChart({
    stroke: { show: false },
    plotOptions: {
      bar: { horizontal: false, barHeight: '30%' },
    },
    xaxis: {
      categories: [
        '<5000',
        '5K-5W',
        '5W-50W',
        '50W-100W',
        '100W-500W',
        '500W-1000W',
        '>1000W'
      ],
    },
  });

  return <Chart type="bar" series={[{ data: series }]} options={chartOptions} height={270} />;
}
