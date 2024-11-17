import axiousResuest from "@/libs/axiousRequest";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export interface taskResponseType {
    createdAt?: Date
    updatedAt?: Date
    _id?: string | number
    task_name: string;
    priority: 'high' | 'medium' | 'low'
    status: 'pending' | 'completed'
}

export const useGetTaskData = () => {
    return useQuery({
        queryKey: ["task_list"],
        queryFn: () =>
            axiousResuest({
                url: `/task`,
                method: "get",
            }),
    });
};


export const useCreateTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (body: any) =>
            await axiousResuest({
                url: `/task`,
                method: "post",
                data: body,
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["task_list"] });
        },
    });
};