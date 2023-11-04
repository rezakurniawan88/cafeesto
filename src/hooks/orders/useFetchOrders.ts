import { useQuery } from "react-query";
import { axiosInstance } from "../../utils/axios";
import { toast } from "react-hot-toast";
import useStore from "../../stores/store";

export const useFetchOrders = () => {
    const { page } = useStore((state) => state);

    return useQuery({
        queryKey: ['fetchOrders', page],
        queryFn: async () => {
            const config = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            };

            const response = await axiosInstance.get(`/orders?page=${page}`, config);
            
            return response;
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        }
    })
};