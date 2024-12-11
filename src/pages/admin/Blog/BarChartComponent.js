

import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export function BarChartComponent() {
    return (
       <div>
           <h3>Emergencias: </h3>
           <BarChart
               {...props}
               series={[
                   { data: [2400], label: 'Por Resolver' },
                   { data: [500], label: (location) => `Resultas` },
               ]}
           />
       </div>
    );
}

const props = {
    width: 500,
    height: 300,
    xAxis: [{ data: ['Comisaria Huacho'], scaleType: 'band' }],
};