import { LineChart } from '@tremor/react';

type EnergyLevelData = {
    date: string;
    元気レベル: number | null;
  };
  
  // コンポーネントのプロップスの型定義
type EnergyProps = {
  energyLevels: EnergyLevelData[];
};

export function LineChartGraph( {energyLevels} :  EnergyProps ) {
  return (
    <LineChart
    categories={[
        '元気レベル'
    ]}
    className="h-72"
    data={energyLevels}
    index="date"
    onValueChange={function noRefCheck(){}}
    />
  );
}