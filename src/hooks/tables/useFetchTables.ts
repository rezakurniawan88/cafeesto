import { useQuery } from "react-query"
import { axiosInstance } from "../../utils/axios"

export const useFetchTables = () => {
    return useQuery({
        queryKey: ['fetchTables'],
        queryFn:async () => {
            const response = await axiosInstance.get('/tables');

            return response;
        }
    })
}