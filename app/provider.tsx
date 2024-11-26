"use client";

import { Header } from "@/components/header";
import store from "../store/store";
import { Provider } from "react-redux";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Providers({ children }: { children: React.ReactNode }) {
  const path = usePathname();

  const restrictedPageForHeader = 
    path === "/signin" || path === "/signup" || path === "/whiteBoard" || path === "/forgotpassword" || path === "/changepassword"

  return (
    <Provider store={store}>
        {!restrictedPageForHeader && <Header />}
      <div>
        {children}
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </Provider>
  );
}
