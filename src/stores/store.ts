import { create } from "zustand";

type TUseStore = {
    activeButton: string;
    sidebarOpen: boolean;
    handlerSidebar: () => void;
    page: number;
    changePage: (selected: number) => void;
    pageMenu: number;
    changePageMenu: (selected: number) => void;
    tableModalOpen: boolean;
    handlerTableModal: () => void;
    deleteModalOpen: boolean;
    handleDeleteModal: () => void;
    successModalOpen: boolean;
    handleSuccessModal: () => void;
}

const useStore = create<TUseStore>((set) => ({
    activeButton: "foods",
    sidebarOpen: false,
    handlerSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen})),
    page: 1,
    changePage: (selected) => set({ page: selected + 1 }),
    pageMenu: 1,
    changePageMenu: (selected) => set({ pageMenu: selected + 1 }),
    tableModalOpen: false,
    handlerTableModal: () => set((state) => ({ tableModalOpen: !state.tableModalOpen})),
    deleteModalOpen: false,
    handleDeleteModal: () => set((state) => ({ deleteModalOpen: !state.deleteModalOpen})),
    successModalOpen: false,
    handleSuccessModal: () => set((state) => ({ successModalOpen: !state.successModalOpen})),
}))

export default useStore;