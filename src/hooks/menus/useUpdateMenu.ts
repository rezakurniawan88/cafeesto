import { useMutation } from "react-query";
import { IDataMenu } from "../../types/types";
import { axiosInstance } from "../../utils/axios";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export const useUpdateMenu = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async (data: IDataMenu) => {
            const config = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            };

            const formDatas = new FormData();
            formDatas.append("_method", "PUT");
            for (const field in data) {
                if (field !== "image") {
                    formDatas.append(field, (data as never)[field]);
                }
            }
            if (data.image.length > 0) {
                formDatas.append("image", data.image[0]);
            }

            const response = await axiosInstance.post(`/menus/${id}`, formDatas, config);

            return response.data.message;
        },
        onSuccess: (data) => {
            toast.success(data);
            navigate("/admin/dashboard/menu");
        },
        onError: () => {
            toast.error("Update data failed");
        }
    }
    )
};