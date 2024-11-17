import { formatTimeStamp } from '@/libs/formatTimeStams'
import { tastDataType } from '@/model/task.type'
import React, { FC } from 'react'


const TaskCard: FC<tastDataType> = ({ task_name, status, priority, _id, createdAt }) => {
    return (
        <div className="p-6 rounded-lg shadow-lg max-w-full md:max-w-80 border relative">

            <div className='flex items-center  gap-2'>
                <div className={`w-3 h-3 ${status === 'pending' ? 'bg-error_1 animate-pulse' : 'bg-primary_color'} mt-1 rounded-[20px] `}></div>
                <p className={` ${status === 'pending' ? 'text-error_1' : 'text-emerald-600'}`}>{status}</p>
            </div>
            <div>
                <h2 className="text-lg line-clamp-3 font-bold mb-2">
                    {task_name}
                </h2>
            </div>
            <div className="flex justify-between">
                <p className={`w-fit px-3 text-sm ${priority === 'high' && 'bg-error_1/80 text-white'}  ${priority === 'medium' && 'bg-warning_1'} ${priority === 'low' && 'bg-success_1'} mt-1 rounded-[20px] `}>
                    {priority}
                </p>
                <p>{formatTimeStamp(createdAt)}</p>
            </div>
        </div>
    )
}

export default TaskCard