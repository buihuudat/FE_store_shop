import { toast } from "react-toastify";
export const ToastHandlers = (type, msg) =>
  toast(msg, {
    position: toast.POSITION.TOP_RIGHT,
    type,
  });
