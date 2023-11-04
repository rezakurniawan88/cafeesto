import { create } from "zustand";
import { IDataUser } from "../types/types";

type TUserStore = {
  data: IDataUser
}

interface UserStoreProps {
    userData: TUserStore | null;
    setUserData: (data: TUserStore) => void;
}

const userStore = create<UserStoreProps>((set) => ({
  userData: null,
  setUserData: (data) => set({ userData: data }),
}));

export default userStore;