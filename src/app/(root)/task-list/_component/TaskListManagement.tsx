"use client";
import CustomTable, { CustomTableColumn } from '@/components/core/table/CustomTable';
import { tastDataType } from '@/model/task.type';
import { Typography } from '@mui/material';
import { FC, useState } from 'react';
import TaskForm from './TaskForm';
import { useCreateTask, useDeleteTask, useGetTaskData, useUpdateTask } from '@/hooks/task.hook';
import { formatDatetamp, formatTimeStamp } from '@/libs/formatTimeStams';
import DeleteAction from '@/components/core/action/DeleteAction';
import { useGetTasks } from '@/hooks/zustand-task.hook';
// import { useGetTasks } from '@/hooks/zustand-task.hook';
// import { useGetTasks } from '@/hooks/getTaskData.hook';


type tableActionType = {
    data: tastDataType;
};
export const CandidateAction: FC<tableActionType> = ({ data }) => {
    const { mutateAsync } = useUpdateTask(data?._id?.toString() || "");
    const { mutateAsync: handleDelte } = useDeleteTask(data?._id?.toString() || "");
    return <div className="flex gap-1">
        <TaskForm instance={data} handleDataSubmit={mutateAsync} />
        <DeleteAction handleDeleteSubmit={handleDelte} />
    </div>
}



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
                    <p className="line-clamp-2 min-w-[200px] text-black">
                        {data.task_name}
                    </p>
                </div>
            ),
        },

        {
            title: 'Priority',
            dataKey: 'priority',
            row: (data: tastDataType) => (
                <div className="space-y-2 min-w-[200px]">
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
                <div className="space-y-2 min-w-[200px]">
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
            row: (data: tastDataType) => (
                <div className='text-black tet-sm flex gap-2 min-w-[200px]'>
                    <p>{formatDatetamp(data?.createdAt || data?.createdAt)}</p>
                    <p> {formatTimeStamp(data?.createdAt || data?.createdAt)}</p>
                </div>
            ),
        },
        {
            title: 'Action',
            dataKey: 'action',
            row: (data: tastDataType) => (
                <div>
                    <CandidateAction data={data} />
                </div>
            ),
        },
    ];



    const [status, setStatus] = useState<string>('');
    const [priority, setPriority] = useState<string>('');

    const { data: taskData, isLoading } = useGetTaskData({
        status,
        priority,
        ordering: "-createdAt",
    });
    const { mutateAsync } = useCreateTask()



    return (
        <div className='space-y-5'>
            <div className='flex justify-between'>
                <Typography variant="h5" >
                    My Tasks
                </Typography>
                <div>
                    <TaskForm handleDataSubmit={mutateAsync} />
                </div>
            </div>
            {/* filtering */}
            <div className='flex gap-4'>
                <div>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className='input_box_style'
                    >
                        <option value="">Status</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                <div>
                    <select
                        id="priority"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className='input_box_style'
                    >
                        <option value="">Priority</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                </div>
            </div>
            {/* table */}
            {/* <CustomTable columns={TableColumn} isLoading={isLoading} data={taskData?.results || []} /> */}
            <CustomTable columns={TableColumn} isLoading={isLoading} data={taskData?.results || []} />

        </div>
    )
}

export default TaskListManagement;