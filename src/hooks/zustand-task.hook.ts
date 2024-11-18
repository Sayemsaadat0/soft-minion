"use client"
import useTaskStore from "@/components/stores/taskStore";
import { useEffect } from "react";

export const useGetTasks = ({ status = "", priority = "", ordering = "-createdAt" }) => {
    const { tasks, loading, error, fetchTasks } = useTaskStore();

    useEffect(() => {
        fetchTasks({ status, priority, ordering });
    }, [status, priority, ordering, fetchTasks]);

    return { tasks, loading, error };
};
