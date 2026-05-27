import { useContext } from "react";

import {
    ToastContext
} from "../../../app/providers/ToastProvider";

export const useToast = () => {
    const {
        toasts,
        showToast
    } = useContext(ToastContext);

    return {
        toasts,
        showToast
    }
}