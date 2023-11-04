import { useQuery } from "react-query";
import { axiosInstance } from "../../utils/axios";

export function useFetchMetrics() {
  return useQuery({
    queryKey: ['fetchMetrics'],
    queryFn: async () => {
        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        };
        
        const response = await axiosInstance.get('/orders/metrics', config);

        return response;
    }
  })
}