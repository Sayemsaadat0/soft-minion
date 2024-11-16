export interface tastDataType {
    id?: string | number
    task_name: string;
    priority: 'high' | 'medium' | 'low'
    status: 'pending' | 'completed'
    created_at: Date
}