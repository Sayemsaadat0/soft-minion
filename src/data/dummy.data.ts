import { tastDataType } from "@/model/task.type";

export const taskFakeData: tastDataType[] = [
    {
        _id: '1',
        task_name: "Finish the project report",
        priority: "high",
        status: "pending",
        created_at: new Date("2024-11-01"),
    },
    {
        _id: 2,
        task_name: "Clean the office desk",
        priority: "low",
        status: "completed",
        created_at: new Date("2024-10-28"),
    },
    {
        _id: 3,
        task_name: "Prepare presentation slides",
        priority: "medium",
        status: "pending",
        created_at: new Date("2024-11-10"),
    },
    {
        _id: 4,
        task_name: "Attend team meeting",
        priority: "medium",
        status: "completed",
        created_at: new Date("2024-11-15"),
    },
    {
        _id: 5,
        task_name: "Fix website bugs",
        priority: "high",
        status: "pending",
        created_at: new Date("2024-11-12"),
    },
    {
        _id: 6,
        task_name: "Order office supplies",
        priority: "low",
        status: "completed",
        created_at: new Date("2024-10-20"),
    },
];