import { useQuery } from "react-query"
import { axiosInstance } from "../../utils/axios";
import toast from "react-hot-toast";

export const useFetchAllUsers = () => {
    return useQuery({
        queryKey: ['fetchAllUsers'],
        queryFn: async () => {
            const config = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            };

            const response = await axiosInstance.get('/auth/users', config);

            return response;
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        }
    });
}