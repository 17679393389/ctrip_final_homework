import Chart from '@/components/chart/chart';
import useChart from '@/components/chart/useChart';

const series = [400, 430, 448, 470, 540, 580];

export default function ChartBar() {
  const chartOptions = useChart({
    stroke: { show: false },
    plotOptions: {
      bar: { horizontal: true, barHeight: '30%' },
    },
    xaxis: {
      categories: [
        '攻略',
        '风景',
        '美食',
        '交通',
        '住宿',
        '其他',
      ],
    },
  });

  return <Chart type="bar" series={[{ data: series }]} options={chartOptions} height={270} />;
}
