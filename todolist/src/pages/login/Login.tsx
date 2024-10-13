import React, { Key, useEffect, useState } from "react";
import styles from "./Login.module.scss";
import { FormLogin, HeaderLogin } from "./component";
import { MODE_LOGIN } from "./interface";

const Login = () => {
  //MAIN RENDER
  return (
    <div className={styles.container}>
      <div className={styles.containerLogin}>
        <HeaderLogin mode={MODE_LOGIN.EMAIL} />
        <FormLogin
          mode={MODE_LOGIN.EMAIL}
          onSubmit={() => {}}
          switchRegister={() => {}}
          onForgetPassword={() => {}}
        />
      </div>
    </div>
  );
};

export default Login;
