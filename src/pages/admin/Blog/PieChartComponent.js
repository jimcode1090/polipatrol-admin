import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export function PieChartComponent() {
    return (
        <div>
            <h3 className={{color: "red"}}>Usuarios: </h3>
            <PieChart
                {...props}
                series={[
                    {
                        data: [
                            {id: 0, value: 10, label: (location) => `Usuarios Activos`},
                            {id: 1, value: 15, label: (location) => `Usuarios Inactivos`},
                        ],
                        type: 'pie',
                        arcLabel: 'label',
                    },
                ]}
            />
        </div>
    );
}

const props = {
    width: 500,
    height: 200,
};