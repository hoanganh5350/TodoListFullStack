import React, { FC, Key, useEffect, useState } from "react";
import styles from "./Styles.module.scss";
import { MODE_LOGIN } from "../interface";
import { LoginOutlined, UserAddOutlined } from "@ant-design/icons";

type HeaderLoginProps = {
  mode: MODE_LOGIN;
};

const HeaderLogin: FC<HeaderLoginProps> = ({ mode }) => {
  //MAIN RENDER
  return (
    <div className={styles.containerHeader}>
      {mode === MODE_LOGIN.LOGIN ? (
        <>
          <div className={styles.outIconLogin}>
            <LoginOutlined className={styles.iconLogin} />
          </div>
          <div className={styles.title}>Đăng nhập với Email</div>
          <div className={styles.sub}>
            Sử dụng Email đã được đăng kí để đăng nhập và sử dụng
          </div>{" "}
        </>
      ) : (
        <>
          <div className={styles.outIconLogin}>
            <UserAddOutlined className={styles.iconLogin} />
          </div>
          <div className={styles.title}>Đăng ký tài khoản</div>
          <div className={styles.sub}>
            Đăng kí tài khoản để sử dụng dịch vụ của chúng tôi
          </div>{" "}
        </>
      )}
    </div>
  );
};

export { HeaderLogin };
