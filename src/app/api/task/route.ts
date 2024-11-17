
import Task from '@/schema/Task';
import { NextResponse } from "next/server";
import "@/DB/db"


export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get("_id");
    const sort = searchParams.get("sort") || "desc";
    const sortDirection = sort === "desc" ? -1 : 1;

    if (_id) {
      const result = await Task.findById(_id);

      if (result) {
        return NextResponse.json(
          { success: true, message: "Single Data Received", result },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { success: false, message: "Task not found" },
          { status: 404 }
        );
      }
    } else {
      // Fetch all tasks
      const results = await Task.find().sort({ createdAt: sortDirection });

      return NextResponse.json(
        { success: true, message: "All Data Received", results },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error Getting Task", error);
    return NextResponse.json(
      { success: false, message: "Failed to Get Task" },
      { status: 500 }
    );
  }
}



//  POST API 
export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (!body.task_name || !body.priority || !body.status) {
      return NextResponse.json(
        { success: false, message: "Task Name, Priority, Status Are Required" }, { status: 400 }
      );
    }

    const _task = await Task.create({
      task_name: body.task_name,
      priority: body.priority,
      status: body.status,
    })
    console.log('_task', _task);

    return NextResponse.json({ success: true, task: _task }, { status: 201 })
  } catch (error) {
    console.error("Error creating Task", error);
    return NextResponse.json(
      { message: "Failed to create Task" },
      { status: 500 }
    );
  }
}
