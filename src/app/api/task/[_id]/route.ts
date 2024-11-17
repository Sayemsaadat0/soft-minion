
import Task from '@/schema/Task';
import { NextResponse } from "next/server";
import "@/DB/db"



export async function PATCH(request: Request, { params }: { params: { _id: string } }) {
    try {
      const { _id } = params; // Get id from URL
      return NextResponse.json({ success: true, message: _id }, { status: 404 })
      const updates = await request.json();
  
      if (!_id) {
        return NextResponse.json({ success: false, message: 'No ID provided' }, { status: 400 });
      }
  
      const updateTask = await Task.findByIdAndUpdate(_id, updates, {
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
  
  
  
  export async function DELETE(request: Request) {
    try {
      const { searchParams } = new URL(request.url);
      const _id = searchParams.get("_id");
      return NextResponse.json({ success: true, message: _id }, { status: 404 })
      console.log(_id)
  
      if (!_id) {
        return NextResponse.json(
          { success: false, message: "_id is required to delete a task" },
          { status: 400 }
        );
      }
  
      const deletedTask = await Task.findByIdAndDelete(_id);
  
      if (deletedTask) {
        return NextResponse.json(
          { success: true, message: "Task deleted successfully", deletedTask },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { success: false, message: "Task not found" },
          { status: 404 }
        );
      }
    } catch (error) {
      console.error("Error deleting Task", error);
      return NextResponse.json(
        { success: false, message: "Failed to delete Task" },
        { status: 500 }
      );
    }
  }
  