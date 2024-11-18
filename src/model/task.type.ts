import { TaskResponseType } from "@/hooks/task.hook";

export interface tastDataType extends TaskResponseType {
    _id?: string | number
    task_name: string;
    priority: 'high' | 'medium' | 'low'
    status: 'pending' | 'completed'
    created_at?: Date
}