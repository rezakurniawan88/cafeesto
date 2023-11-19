import { useQuery } from "react-query";
import { axiosInstance } from "../../utils/axios";
import { toast } from "react-hot-toast";
import useStore from "../../stores/store";

export const useFetchMenusDashboard = () => {
    const { pageMenu } = useStore((state) => state);

    return useQuery({
        queryKey: ['fetchAllMenusForDashbord', pageMenu],
        queryFn: async () => {
            const config = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            };

            const response = await axiosInstance.get(`/menus-dashboard?page=${pageMenu}`, config);

            return response;
        },
        onError: () => {
            toast.error("Get Data Menu Failed");
        }
    })
};