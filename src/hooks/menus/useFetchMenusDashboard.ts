import { useQuery } from "react-query";
import { axiosInstance } from "../../utils/axios";
import { toast } from "react-hot-toast";

export const useFetchMenusDashboard = () => {
    return useQuery({
        queryKey: ['fetchAllMenusForDashbord'],
        queryFn: async () => {
            const config = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            };

            const response = await axiosInstance.get('/menus-dashboard', config);

            return response?.data?.menus?.data;
        },
        onError: () => {
            toast.error("Get Data Menu Failed");
        }
    })
};