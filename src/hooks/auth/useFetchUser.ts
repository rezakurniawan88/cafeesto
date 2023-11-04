import { useMutation } from "react-query"
import { axiosInstance } from "../../utils/axios";
import toast from "react-hot-toast";
import userStore from "../../stores/userStore";

export const useFetchUser = () => {
    const { setUserData } = userStore((state) => state);

    return useMutation({
        mutationKey: ['fetchUser'],
        mutationFn: async () => {
            const config = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            };

            const response = await axiosInstance.post('/auth/me', null, config);

            return response;
        },
        onSuccess: (data) => {
            setUserData(data);
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        }
    });
}