/* eslint-disable @typescript-eslint/ban-ts-comment */
import BoxHeader from '@/components/BoxHeader';
import DashboardBox from '@/components/DashboardBox';
import FlexBetween from '@/components/FlexBetween';
import { Box, Typography, useTheme } from '@mui/material';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';


const TargetVisualization = () => {
    const palette = useTheme().palette
    const pieColors = [palette.primary[800], palette.primary[300]];
    const pieData = [
        {name: 'GroupA', value: 400000},
        {name: 'GroupB', value: 300000},
      ]
    if (!pieData) {
    return <div>Loading...</div>;
    }
    return (
        
        <DashboardBox mt={"10px"} pt={"0.5rem"} height={"300px"}>
            <BoxHeader
                title="Campaigns and Targets"
                subtitle=""
                />
                <FlexBetween mt={"7rem"}>
                    <ResponsiveContainer 
                    width={"100%"} 
                    height={"80%"}
                    >
                    <FlexBetween gap={"1.5rem"} pr={"1rem"} >
                        <PieChart 
                        width={110} 
                        height={90}
                        margin={{ top: 0, right: -10, left: 10, bottom: 0 }} >
                            <Pie
                            stroke='none'
                            data={pieData}
                            innerRadius={18}
                            outerRadius={38}
                            fill={palette.tertiary[500]}
                            paddingAngle={2}
                            dataKey="value"
                            >
                            {pieData.map((index) => {
                                {/* @ts-expect-error */}
                                return <Cell key={index} fill={pieColors[index]} />
                            })}
                            </Pie>
                        </PieChart>
                        <Box ml={"-0.75rem"} flexBasis={"40%"} textAlign={"center"}>
                            <Typography variant="h5" >Target Sales</Typography>
                            <Typography variant="h3" m={"0.3rem 0"} color={palette.primary[300]} >83</Typography>
                            <Typography variant="h6" >Target Sales</Typography>
                        </Box>
                        <Box flexBasis={"40%"}>
                            <Typography variant="h5" >Loses in Revenue</Typography>
                            <Typography variant="h6">loses are down 25%</Typography>
                            <Typography variant="h5" mt={"0.4rem"} >Margins are up by 32% from last month</Typography>
                        </Box>
                    </FlexBetween>
                    </ResponsiveContainer> 
                    <ResponsiveContainer 
                    width={"100%"} 
                    height={"80%"}
                    >
                    <FlexBetween gap={"1.5rem"} pr={"1rem"} >
                        <PieChart 
                        width={110} 
                        height={90}
                        margin={{ top: 0, right: -10, left: 10, bottom: 0 }} >
                            <Pie
                            stroke='none'
                            data={pieData}
                            innerRadius={18}
                            outerRadius={38}
                            fill={palette.tertiary[500]}
                            paddingAngle={2}
                            dataKey="value"
                            >
                            {pieData.map((index) => {
                                {/* @ts-expect-error */}
                                return <Cell key={index} fill={pieColors[index]} />
                            })}
                            </Pie>
                        </PieChart>
                        <Box ml={"-0.75rem"} flexBasis={"40%"} textAlign={"center"}>
                            <Typography variant="h5" >Target Sales</Typography>
                            <Typography variant="h3" m={"0.3rem 0"} color={palette.primary[300]} >83</Typography>
                            <Typography variant="h6" >Target Sales</Typography>
                        </Box>
                        <Box flexBasis={"40%"}>
                            <Typography variant="h5" >Loses in Revenue</Typography>
                            <Typography variant="h6">loses are down 25%</Typography>
                            <Typography variant="h5" mt={"0.4rem"} >Margins are up by 32% from last month</Typography>
                        </Box>
                    </FlexBetween>
                    </ResponsiveContainer>  
                    <ResponsiveContainer 
                    width={"100%"} 
                    height={"80%"}
                    >
                        <FlexBetween gap={"1.5rem"} pr={"1rem"} >
                            <PieChart 
                            width={110} 
                            height={90}
                            margin={{ top: 0, right: -10, left: 10, bottom: 0 }} >
                                <Pie
                                stroke='none'
                                data={pieData}
                                innerRadius={18}
                                outerRadius={38}
                                fill={palette.tertiary[500]}
                                paddingAngle={2}
                                dataKey="value"
                                >
                                {pieData.map((index) => {
                                    // @ts-expect-error 
                                    return <Cell key={index} fill={pieColors[index]} />
                                })}
                                </Pie>
                            </PieChart>
                            <Box ml={"-0.75rem"} flexBasis={"40%"} textAlign={"center"}>
                                <Typography variant="h5" >Target Sales</Typography>
                                <Typography variant="h3" m={"0.3rem 0"} color={palette.primary[300]} >83</Typography>
                                <Typography variant="h6" >Target Sales</Typography>
                            </Box>
                            <Box flexBasis={"40%"}>
                                <Typography variant="h5" >Loses in Revenue</Typography>
                                <Typography variant="h6">loses are down 25%</Typography>
                                <Typography variant="h5" mt={"0.4rem"} >Margins are up by 32% from last month</Typography>
                            </Box>
                        </FlexBetween>
                    </ResponsiveContainer>   
                </FlexBetween>               
        </DashboardBox>           
    )
}

export default TargetVisualization