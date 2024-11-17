"use client"
import CustomTable, { CustomTableColumn } from '@/components/core/table/CustomTable';
import { taskFakeData } from '@/data/dummy.data';
import { tastDataType } from '@/model/task.type';
import { Typography } from '@mui/material';
import Link from 'next/link';
import React, { FC } from 'react'
import TaskForm from './TaskForm';





const TaskListManagement = () => {

    // table
    const TableColumn: CustomTableColumn[] = [
        {
            title: "No",
            dataKey: "serial",
            row: (data: tastDataType, rowIndex) => <div>{rowIndex + 1}</div>,
        },
        {
            title: 'Task',
            dataKey: 'task_name',
            row: (data: tastDataType) => (
                <div>
                    <p className="line-clamp-2  text-black">
                        {data.task_name}
                    </p>
                </div>
            ),
        },

        {
            title: 'Priority',
            dataKey: 'priority',
            row: (data: tastDataType) => (
                <div className="space-y-2">
                    <div
                        className={`w-fit text-center ${data?.priority === 'high' && 'bg-error_1/80 '} ${data?.priority === 'medium' && 'bg-warning_1 '} ${data?.priority === 'low' && ' bg-success_1 '}  min-w-[100px]`}
                    >
                        {data.priority === 'high' && 'High' || data.priority === 'medium' && 'Medium' || data.priority === 'low' && 'Low' || 'N/A'}
                    </div>
                </div>
            ),
        },
        {
            title: 'Status',
            dataKey: 'status',
            row: (data: tastDataType) => (
                <div className="space-y-2">
                    <div
                        className={`w-fit text-center ${data?.status === 'pending' && 'bg-orange-300'} ${data?.status === 'completed' && ' bg-primary_color '}  min-w-[100px]`}
                    >
                        {data.status === 'pending' && 'Pending' || data.status === 'completed' && 'Completed' || 'N/A'}
                    </div>
                </div>
            ),
        },
        {
            title: 'Created ',
            dataKey: 'created_at',
            row: () => (
                <div>
                    <p className="line-clamp-2 text-black">
                        10-10-10
                        {/* {data?.created_at.toLocaleString()} */}
                    </p>
                </div>
            ),
        },
        {
            title: 'Action',
            dataKey: 'action',
            row: (data: tastDataType) => (
                <div>
                    <CandidateTableAction data={data} />
                </div>
            ),
        },
    ];

    type tableActionType = {
        data: tastDataType;
    };
    const CandidateTableAction: FC<tableActionType> = ({ data }) => (
        <div>
            <div className="">
                <TaskForm instance={data} handleDataSubmit={() => undefined} />
            </div>
        </div>
    );
    return (
        <div className='space-y-5'>
            <TaskForm handleDataSubmit={() => undefined} />
            <Typography variant="h5" >
                My Tasks
            </Typography>
            <div>
                <li>delete component</li>
                <li>Task Crud Operation</li>
                <li>Validation ZOD</li>
                <li>Api Call using Zustand</li>
                <li>Filtering using status, Priority , limit , pagination , </li>
                <li>Tab Open,Progress,Cosed</li>
                <li>Show Statistics Via Chart</li>
                <li>
                    Resourses 1 :  {" "}
                    <Link href={'https://www.youtube.com/watch?v=cc_xmawJ8Kg'} target='_blank'>Hook form And Zod</Link>
                </li>
                <li>
                    Resourses 3 :  {" "}
                    <Link href={'https://github.com/react-hook-form/resolvers#zod'} target='_blank'>Hook form And Zod Documentation</Link>
                </li>
                <li>
                    Resourses 2 :  {" "} <br />
                    <Link href={'https://www.youtube.com/watch?v=co3ZJ0ktI7c'} target='_blank'>Zustand 1</Link> <br />
                    <Link href={'https://www.youtube.com/watch?v=AYO4qHAnLQI'} target='_blank'>Zustand 2</Link>
                </li>
            </div>
            <CustomTable columns={TableColumn} isLoading={false} data={taskFakeData || []} />
        </div>
    )
}

export default TaskListManagement;