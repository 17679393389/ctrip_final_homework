import Chart from '@/components/chart/chart';
import useChart from '@/components/chart/useChart';

// const series = [100, 58, 54, 44, 47, 43, 10];

export default function ChartBar_Up_Fans({series}: any) {
  const chartOptions = useChart({
    stroke: { show: false },
    plotOptions: {
      bar: { horizontal: false, barHeight: '30%' },
    },
    xaxis: {
      categories: [
        '<100',
        '100-500',
        '500-1k',
        '1k-5k',
        '5k-1W',
        '1W-5W',
        '>5W'
      ],
    },
  });

  return <Chart type="bar" series={[{ data: series }]} options={chartOptions} height={270} />;
}
