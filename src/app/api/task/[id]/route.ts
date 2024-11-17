import Task from '@/schema/Task';
import { NextResponse } from "next/server";
import "@/DB/db"



export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const updates = await request.json();

    if (!id) {
      return NextResponse.json({ success: false, message: 'No ID provided' }, { status: 400 });
    }

    const updateTask = await Task.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (updateTask) {
      return NextResponse.json({ success: true, message: 'Task Updated Successfully', updateTask }, { status: 200 });
    } else {
      return NextResponse.json({ success: false, message: 'Task not found' }, { status: 404 });
    }
  } catch (error) {
    console.error("Error updating Task", error);
    return NextResponse.json({ success: false, message: "Failed to update Task" }, { status: 500 });
  }
}


export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ success: false, message: 'No ID provided' }, { status: 400 });
    }

    const deletedTask = await Task.findByIdAndDelete(id);

    if (deletedTask) {
      return NextResponse.json({ success: true, message: 'Task Deleted Successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ success: false, message: 'Task not found' }, { status: 404 });
    }
  } catch (error) {
    console.error("Error deleting Task", error);
    return NextResponse.json({ success: false, message: "Failed to delete Task" }, { status: 500 });
  }
}