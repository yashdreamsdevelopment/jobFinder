import { createContext } from "react";
import toast, { Toaster } from "react-hot-toast";

export const ToastContext = createContext(null);

const ToastProvider = ({ children }) => {
    const notify = (msg, type) => {
        if (type === "error") {
            toast.error(msg);
        }
        if (type === "success") {
            toast.success(msg);
        }
    };

    return (
        <ToastContext.Provider value={{ notify }}>
            <Toaster />
            {children}
        </ToastContext.Provider>
    )
}

export const withToastProvider = (Component) => {
    return (props) => {
        return (
            <ToastProvider>
                <Component {...props} />
            </ToastProvider>
        )
    }
}