import { useQuery } from "react-query"
import { axiosInstance } from "../../utils/axios"
import { IDataOrdersByCategoryResponse } from "../../types/types";

export function useFetchByCategory() {
    return useQuery<IDataOrdersByCategoryResponse, Error>({
        queryKey: ["fetchOrdersByCategory"],
        queryFn: async () => {
            const config = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            };

            const response = await axiosInstance.get<IDataOrdersByCategoryResponse>('/orders/category', config);

            return response?.data;
        }
    })
}

export default useFetchByCategory