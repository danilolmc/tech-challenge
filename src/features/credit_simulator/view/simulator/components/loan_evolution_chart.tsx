import {CartesianGrid, Line, LineChart, Tooltip, TooltipProps,} from "recharts";
import {ChartConfig, ChartContainer} from "@/components/ui/chart.tsx";

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {moneyFormat} from "@/lib/utils.ts";

interface ChartData {
    month: number;
    totalPayed: number;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
interface CustomTooltipProps extends TooltipProps<any, any> {
    active?: boolean;
    payload?: any[];
    label?: string;
}

export type LoanEvolutionChartProps = {
    paymentEvolution: ChartData[]
}
const CustomTooltip = ({active, payload, label}: CustomTooltipProps) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip bg-background p-2 border-l-2 border-l-primary">
                <p>{`Mês: ${label}`}</p>
                <p>{`Total pago: ${moneyFormat(payload[0]?.value)}`}</p>
            </div>
        );
    }
    return null;
};

export const LoanEvolutionChart = ({paymentEvolution}: LoanEvolutionChartProps) => {
    const chartData = paymentEvolution;

    const chartConfig = {
        totalPayed: {
            label: "Total pago",
            color: "hsl(var(--primary))",
        },
        month: {
            label: "Mês",
            color: "hsl(var(--primary))",
        },
    } satisfies ChartConfig;

    return (<Card>
            <CardHeader>
                <CardTitle>Evolução do empréstimo</CardTitle>
                <CardDescription>Confira a evolução do total pago</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <Tooltip
                            content={<CustomTooltip/>}
                        />
                        <Line
                            dataKey="totalPayed"
                            type="linear"
                            stroke="hsl(var(--primary))"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
                </CardContent>
        </Card>
    );
}