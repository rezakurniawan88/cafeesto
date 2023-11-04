import { useQuery } from "react-query";
import { axiosInstance } from "../../utils/axios";
import { toast } from "react-hot-toast";

export const useFetchMenus = () => {
    return useQuery({
        queryKey: ['fetchAllMenus'],
        queryFn: async () => {
            const response = await axiosInstance.get(`/menus`);

            return response.data.menus;
        },
        onError: () => {
            toast.error("Get Data Menu Failed");
        }
    })
};