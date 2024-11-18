'use client';
import { useGetTaskData } from '@/hooks/task.hook';
import { formatDatetamp } from '@/libs/formatTimeStams';
import React, { FC } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';



// Bar Chart
const PriorityRatio = ({ taskData }: { taskData: any }) => {
    const groupedData = taskData.reduce((acc: any, task: any) => {
        const date = formatDatetamp(task.createdAt)

        console.log(date)
        if (!acc[date]) {
            acc[date] = { high: 0, medium: 0, low: 0 };
        }
        if (task.priority === 'high') acc[date].high++;
        if (task.priority === 'medium') acc[date].medium++;
        if (task.priority === 'low') acc[date].low++;
        return acc;
    }, {});

    const chartData = Object.keys(groupedData).map((date) => ({
        name: date,
        high: groupedData[date].high,
        medium: groupedData[date].medium,
        low: groupedData[date].low
    }));

    return (
        <div className="overflow-x-auto
        
        ">
            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    data={chartData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="high" barSize={60} fill="#f75140" />
                    <Bar dataKey="medium" barSize={60} fill="#e8bc60" />
                    <Bar dataKey="low" barSize={60} fill="#a2c483" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};



// pie chart
type piechartDataType = {
    pendingTasksCount: number
    completedTasksCount: number
}
const PieCharts: FC<piechartDataType> = ({ pendingTasksCount, completedTasksCount }) => {
    const data = [
        { name: 'Completed', value: completedTasksCount },
        { name: 'Pending', value: pendingTasksCount },
    ];

    const COLORS = ['#6ebbb7', '#FF8042'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };
    return (
        <div className="border bg-secondary_color  shadow-lg ">
            <div className="w-full ">
                <ResponsiveContainer className={' mx-auto border-black p-0 w-1/2'} width={300} height={300}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={120}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={entry?.name} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="flex flex-row justify-center gap-5 py-5">
                {data.map((entry, index) => (
                    <div key={index} className="flex items-center flex-col gap-5">
                        <div
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            className="w-6 h-6 rounded-full "
                        ></div>
                        <span className="text-oc-primary-1-500">{entry.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};




// Default Component
const HomeManagement = () => {

    const { data: taskData, isLoading } = useGetTaskData({ status: "", priority: "", });

    const pendingTasksCount = taskData?.results.filter((status: any) => status.status === 'pending').length || 0;
    const completedTasksCount = taskData?.results.filter((status: any) => status.status === 'completed').length || 0;



    return (
        <div>

            {
                !isLoading && taskData && <div className='flex flex-col xl:flex-row gap-10 xl:items-center'>

                    <div className='xl:w-1/3'>
                        <PieCharts pendingTasksCount={pendingTasksCount} completedTasksCount={completedTasksCount} />
                    </div>
                    <div className='xl:w-2/3'>
                        <PriorityRatio taskData={taskData?.results} />
                    </div>
                </div>
            }
        </div>

    )
}

export default HomeManagement