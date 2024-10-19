import React, { FC, Key, useEffect, useState } from "react";
import styles from "./Styles.module.scss";
import { MODE_LOGIN } from "../interface";
import { LoginOutlined } from "@ant-design/icons";

type HeaderLoginProps = {
  mode: MODE_LOGIN;
};

const HeaderLogin: FC<HeaderLoginProps> = ({}) => {
  //MAIN RENDER
  return (
    <div className={styles.containerHeader}>
      <div className={styles.outIconLogin}>
        <LoginOutlined className={styles.iconLogin}/>
      </div>
      <div className={styles.title}>Đăng nhập với Email</div>
      <div className={styles.sub}>
        Sử dụng Email đã được đăng kí để đăng nhập và sử dụng
      </div>
    </div>
  );
};

export { HeaderLogin };
