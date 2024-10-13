import React, { FC, Key, useEffect, useState } from "react";
import styles from "./Styles.module.scss";
import { MODE_LOGIN } from "../interface";

type HeaderLoginProps = {
  mode: MODE_LOGIN;
};

const HeaderLogin: FC<HeaderLoginProps> = ({}) => {
  //MAIN RENDER
  return (
    <div className={styles.containerHeader}>
      <div className={styles.title}>Đăng nhập với Email</div>
      <div className={styles.sub}>
        Sử dụng Email đã được đăng kí để đăng nhập và sử dụng
      </div>
    </div>
  );
};

export { HeaderLogin };
