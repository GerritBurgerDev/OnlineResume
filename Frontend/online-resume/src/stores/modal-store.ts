import create from "zustand";

interface IModalStore {
    // Data
    modalType: string,
    modalData: any | undefined,

    // Loading States
    modalLoading: boolean,

    // Actions
    openModal: (modalType: string, modalData?: any | undefined) => void,
    closeModal: () => void,
}

export const useModalStore = create<IModalStore>((set) => ({
    modalType: '',
    modalData: {},
    modalLoading: false,
    openModal: (modalType: string, modalData: any | undefined = undefined) => {
        set(() => ({
            modalType,
            modalData
        }));
    },
    closeModal: () => {
        set(() => ({
            modalType: '',
            modalData: {}
        }));
    }
}))