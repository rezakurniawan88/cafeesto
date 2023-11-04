import { useMutation } from "react-query"
import { axiosInstance } from "../../utils/axios"
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async (data) => {
            const response = await axiosInstance.post('/auth/register', data);

            return response.data.message;
        },
        onSuccess: (data) => {
            toast.success(data);
            navigate('/login');
        },
        onError: () => {
            toast.error('Registration Failed');
        }
    })
}