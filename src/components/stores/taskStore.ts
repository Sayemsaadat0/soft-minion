// import { create } from "zustand";
// import axiosRequest from "@/libs/axiousRequest";

import axiousResuest from "@/libs/axiousRequest";
import { create } from "zustand";


// interface TaskStore {
//   tasks: any;
//   isLoading: boolean;
//   error: string | null;
//   fetchTasks: (params: { status?: string; priority?: string; ordering?: string }) => Promise<void>;
// }

// const useTaskStore = create<TaskStore>((set) => ({
//   tasks: [],
//   isLoading: false,
//   error: null,

//   fetchTasks: async ({ status = "", priority = "", ordering = "-createdAt" }) => {
//     set({ isLoading: true, error: null }); 

//     try {
//       const response = await axiosRequest({
//         url: `/task?ordering=${ordering}&status=${status}&priority=${priority}`,
//         method: "get",
//       });

//       set({ tasks: response.data, isLoading: false });
//     } catch (err: any) {
//       set({ error: err.message || "Error fetching tasks", isLoading: false });
//     }
//   },
// }));

// export default useTaskStore;





interface TaskStore {
  tasks: any;
  loading: boolean;
  error: string | null;
  fetchTasks: (params: { status?: string; priority?: string; ordering?: string }) => Promise<void>;
}

const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  loading: false,
  error: null,

  fetchTasks: async ({ status = "", priority = "", ordering = "-createdAt" }) => {
    set({ loading: true, error: null }); // Set loading state to true and reset error

    try {
      // Use your custom axiosRequest function to fetch data
      const response = await axiousResuest({
        url: `/task?ordering=${ordering}&status=${status}&priority=${priority}`,
        method: "get",
      });

      set({ tasks: response, loading: false }); // Update state with fetched tasks
    } catch (err: any) {
      set({ error: err.message || "Error fetching tasks", loading: false }); // Handle errors
    }
  },
}));

export default useTaskStore;


