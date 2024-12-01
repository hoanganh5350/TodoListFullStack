import React, { useState, useEffect, createContext, useContext } from "react";
import styles from "./Toastify.module.scss";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastContext = createContext<any>(undefined);

type Toastify = {
  title?: string;
  content: string;
  type: "success" | "error";
  autoClose?: number;
};

export const useToastContext = () => {
  return useContext(ToastContext);
};

const ToastifyContext = ({ children }: any) => {
  const toastContainer = (content: string, title?: string) => (
    <div className={styles.toastContainer}>
      {!!title && <div className={styles.toastTitle}>{title}</div>}
      <div className={styles.toastContent}>{content}</div>
    </div>
  );
  //functions to handle actions
  const showToast = (body: Toastify) =>
    toast(toastContainer(body.content, body.title), {
      position: "top-right",
      autoClose: body.autoClose ?? 5000,
      hideProgressBar: false,
      closeOnClick: true,
      rtl: false,
      pauseOnFocusLoss: true,
      pauseOnHover: true,
      type: body.type,
    });

  //MAIN RENDER
  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

export { ToastifyContext };
