/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetSignupsQuery } from "@/state/api";
import { useTheme } from "@mui/material";
import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const SignupsOverview = () => {
    const palette = useTheme().palette;
    console.log("🚀 ~ SignupsOverview ~ palette:", palette)
    const { data: signupDistribution } = useGetSignupsQuery();
    console.log("🚀 ~ SignupsOverview ~ signupData:", signupDistribution)

    const data = useMemo(() => {
        if (!signupDistribution) return [];
    
        const result: Array<{
            product: string;
            Primary: number;
            Secondary: number;
            IGCSE: number;
        }> = [];
    
        signupDistribution.forEach(({ product, schools }) => {
            const entry = { product } as any;
            schools.forEach(({ type, signups }) => {
                entry[type] = signups;
            });
            result.push(entry);
        });
    
        return result;
    }, [signupDistribution]);
    
  return (
    <ResponsiveContainer width={"100%"} height={"30%"}>
        <BarChart width={730} height={250} data={data}>
            <CartesianGrid vertical={false}  strokeDasharray={palette.grey[800]}/>
            <XAxis 
            dataKey="product"
            tickLine={false}
            axisLine={false}
             />
            <YAxis
            tickLine={false}
            axisLine={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="Primary" fill={palette.primary[800]} />
            <Bar dataKey="Secondary" fill={palette.primary[600]}/>
            <Bar dataKey="IGCSE" fill={palette.primary[400]} />
        </BarChart>
    </ResponsiveContainer>
  )
}

export default SignupsOverview