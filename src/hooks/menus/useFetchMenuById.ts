import { useQuery } from "react-query"
import { axiosInstance } from "../../utils/axios";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

export const useFetchMenuById = () => {
    const { id } = useParams();
    
    return useQuery({
        queryKey: ['fetchMenu'],
        queryFn: async () => {
            const response = await axiosInstance.get(`/menus/${id}`);

            return response.data.menu;
        },
        onError: () => {
            toast.error("Get Data Menu Failed");
        }
    });
}