import React, { Key, useEffect, useState } from "react";
import styles from "./Login.module.scss";
import { FormLogin, HeaderLogin } from "./component";
import { MODE_LOGIN, SCREEN_LOGIN } from "./interface";
import { FormRegister } from "./component/FormRegister";

const Login = () => {
  const [screenLogin, setScreenLogin] = useState<SCREEN_LOGIN>(
    SCREEN_LOGIN.LOGIN
  );

  const renderScreenLogin = () => {
    switch (screenLogin) {
      case SCREEN_LOGIN.LOGIN:
        return (
          <FormLogin
            onSubmit={() => {}}
            switchRegister={() => setScreenLogin(SCREEN_LOGIN.REGISTER)}
            onForgetPassword={() => {}}
          />
        );
      case SCREEN_LOGIN.REGISTER:
        return (
          <FormRegister
            onSubmitForm={() => {}}
            switchLogin={() => setScreenLogin(SCREEN_LOGIN.LOGIN)}
          />
        );
      case SCREEN_LOGIN.FORGET_PASS:
    }
  };
  //MAIN RENDER
  return (
    <div className={styles.container}>
      <div className={styles.containerLogin}>{renderScreenLogin()}</div>
    </div>
  );
};

export default Login;
