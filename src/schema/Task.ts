import { tastDataType } from "@/model/task.type";
import { model, models, Schema } from "mongoose";

const taskSchema = new Schema<tastDataType>(
    {
        task_name: { type: String, required: true },
        priority: { type: String, required: true },
        status: { type: String, required: true },
    },
    { timestamps: true }
)



const Task = models.Task || model<tastDataType>("Task", taskSchema)

export default Task