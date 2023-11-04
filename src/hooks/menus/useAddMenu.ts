import { useMutation } from "react-query"
import { axiosInstance } from "../../utils/axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { IDataMenu } from "../../types/types";

export const useAddMenu = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async (data: IDataMenu) => {
            const config = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            };

            const formData = new FormData();
            for (const field in data) {
                formData.append(field, (data as never)[field]);
            }
            formData.append("image", data.image[0]);

            const response = await axiosInstance.post(`/menus`, formData, config);

            return response;
        },
        onSuccess: () => {
            toast.success("Add new menu successfully");
            navigate("/admin/dashboard/menu");
        },
        onError: () => {
            toast.error("Error, Menu can't added");
        }
    })
}