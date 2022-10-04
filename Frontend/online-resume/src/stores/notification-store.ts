import create from "zustand";
import {AlertColor, SnackbarOrigin} from "@mui/material";
import {ReactNode} from "react";

interface INotification {
    isOpen?: boolean,
    color: AlertColor,
    content: string | ReactNode,
    position?: SnackbarOrigin,
    timeout?: number,
}

interface INotificationStore {
    // Data
    notification: INotification | undefined

    // Loading States
    // TODO: Nothing here yet.

    // Actions
    openNotification: (config: INotification) => void,
    closeNotification: () => void,
}

export const useNotificationStore = create<INotificationStore>((set) => ({
    notification: {
        isOpen: false,
        color: 'success',
        content: '',
        position: {
            vertical: 'top',
            horizontal: 'center'
        }
    },
    openNotification: (config: INotification) => {
        set(() => ({
            notification: {
                ...config,
                isOpen: true,
                ...(!config.position && { position: { vertical: 'top', horizontal: 'center'}}),
                ...(!config.timeout && { timeout: 3000 })
            }
        }));
    },
    closeNotification: () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        set((state) => ({
            notification: {
                ...state.notification,
                isOpen: false
            },
        }));
    },
}))