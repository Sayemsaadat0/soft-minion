"use client";
import axiousResuest from "@/libs/axiousRequest";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface TaskResponseType {
    createdAt?: Date;
    updatedAt?: Date;
    _id?: string | number;
    task_name: string;
    priority: "high" | "medium" | "low";
    status: "pending" | "completed";
}

export const useGetTaskData = ({ status = "", priority = "", ordering = "-createdAt" }) => {
    return useQuery({
        queryKey: ["task_list", status, priority, ordering],
        queryFn: () =>
            axiousResuest({
                url: `/task?ordering=${ordering}&status=${status}&priority=${priority}`,
                method: "get",
            }),
        enabled: true,
    });
};

export const useCreateTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (body: TaskResponseType) =>
            axiousResuest({
                url: "/task",
                method: "post",
                data: body,
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["task_list"] });
        },
    });
};

export const useUpdateTask = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (body: Partial<TaskResponseType>) =>
            axiousResuest({
                url: `/task/${id}`,
                method: "patch",
                data: body,
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["task_list"] });
        },
    });
};

export const useDeleteTask = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () =>
            axiousResuest({
                url: `/task/${id}`,
                method: "delete",
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["task_list"] });
        },
    });
};
