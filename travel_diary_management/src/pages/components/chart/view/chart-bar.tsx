import Chart from '@/components/chart/chart';
import useChart from '@/components/chart/useChart';


export default function ChartBar({seriesCategory}: any) {
  const category = seriesCategory.map((item: any) => item.label);
  const series = seriesCategory.map((item: any) => item.count);
  const chartOptions = useChart({
    stroke: { show: false },
    plotOptions: {
      bar: { horizontal: true, barHeight: '30%' },
    },
    xaxis: {
      categories: category,
    },
  });

  return <Chart type="bar" series={[{ data: series }]} options={chartOptions} height={270} />;
}
