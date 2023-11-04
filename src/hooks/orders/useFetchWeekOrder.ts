import { useQuery } from "react-query"
import { axiosInstance } from "../../utils/axios"
import { IDataWeeklyOrdersResponse } from "../../types/types";

export function useFetchWeekOrder() {
    return useQuery<IDataWeeklyOrdersResponse, Error>({
        queryKey: ["fetchWeeklyOrders"],
        queryFn: async () => {
            const config = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            };

            const response = await axiosInstance.get<IDataWeeklyOrdersResponse>('/orders/weekly', config);

            return response?.data;
        }
    })
}

export default useFetchWeekOrder