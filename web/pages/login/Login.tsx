import React, { Key, useEffect, useState } from "react";
import styles from "./Login.module.scss";
import { FormLogin } from "./component";
import { SCREEN_LOGIN } from "./interface";
import { FormRegister } from "./component/FormRegister";
import { useAuthContext } from "../../components/Auth/AuthProvider";
import { httpRequest } from "../../utils/http";
import { useRouter } from "next/router";
import { useToastContext } from "../../components/Toast/Toastify";

const Login = () => {
  const [screenLogin, setScreenLogin] = useState<SCREEN_LOGIN>(
    SCREEN_LOGIN.LOGIN
  );
  const router = useRouter();

  const { showToast } = useToastContext() as {
    showToast: (body: any) => void;
  };

  const { setLoading } = useAuthContext() as {
    isAuthenticator: boolean;
    setLoading: (isLoading: boolean) => void;
  };

  const handleLogin = async (account: FormLogin) => {
    setLoading(true);
    try {
      const login = await httpRequest("POST", `user/login`, {
        email: account.email,
        password: account.password,
      });

      showToast({
        title: "Thông báo",
        content: "Đăng nhập thành công",
        type: "success",
      });

      if (login?.id) {
        router.push("/");
      }
    } catch (error: any) {
      console.log(error);
      showToast({
        title: "Thông báo",
        content: error?.error ?? "Đăng nhập thất bại",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const validateRegister = (account: FormRegister) => {
    //TODO: validate form đăng kí
  };

  const handleRegister = async (account: FormRegister) => {
    validateRegister(account);
    setLoading(true);
    try {
      const register = await httpRequest("POST", `user/create-user`, {
        fullName: account.fullName,
        userName: account.userName,
        address: account.address,
        email: account.email,
        phone: account.phone,
        password: account.password,
      });

      showToast({
        title: "Thông báo",
        content: "Đăng kí tài khoản thành công !!",
        type: "success",
      });

      if (register) {
        setScreenLogin(SCREEN_LOGIN.LOGIN);
      }
    } catch (error: any) {
      console.log(error);
      showToast({
        title: "Thông báo",
        content: error?.error ?? "Đăng kí thất bại !!",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderScreenLogin = () => {
    switch (screenLogin) {
      case SCREEN_LOGIN.LOGIN:
        return (
          <FormLogin
            onSubmit={(formLogin: FormLogin) => {
              if (!formLogin?.email || !formLogin?.password) {
                showToast({
                  title: "Thông báo",
                  content: "Nhập đầy đủ thông tin đăng nhập",
                  type: "success",
                });
                return;
              }
              handleLogin(formLogin);
            }}
            switchRegister={() => setScreenLogin(SCREEN_LOGIN.REGISTER)}
            onForgetPassword={() => {}}
          />
        );
      case SCREEN_LOGIN.REGISTER:
        return (
          <FormRegister
            onSubmitForm={handleRegister}
            switchLogin={() => setScreenLogin(SCREEN_LOGIN.LOGIN)}
          />
        );
      case SCREEN_LOGIN.FORGET_PASS:
    }
  };
  //MAIN RENDER
  return (
    <div
      className={`${styles.container} ${
        screenLogin === SCREEN_LOGIN.LOGIN
          ? styles.backgroundLogin
          : styles.backgroundRegister
      }`}
    >
      <div className={styles.containerLogin}>{renderScreenLogin()}</div>
    </div>
  );
};

export default Login;
