import { useQuery } from "react-query";
import { axiosInstance } from "../../utils/axios";

export const useCheckAuth = () => {
    return useQuery({
        queryFn: async () => {
            const config = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }

            const response = await axiosInstance.get('/auth/check', config);

            return response?.data?.isValid;
        }
    });
}