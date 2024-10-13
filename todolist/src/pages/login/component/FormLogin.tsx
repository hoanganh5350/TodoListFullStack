import React, { FC, useState } from "react";
import styles from "./Styles.module.scss";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Input, Button } from "antd";
import { MODE_LOGIN } from "../interface";

export enum NAME_FORM {
  EMAIL = "email",
  PHONE = "phone",
  PASSWORD = "password",
}

type ValueForm = {
  [NAME_FORM.EMAIL]?: string;
  [NAME_FORM.PHONE]?: string;
  [NAME_FORM.PASSWORD]?: string;
};

type FormLoginProps = {
  mode: MODE_LOGIN;
  onSubmit: (value: ValueForm) => void;
  switchRegister: VoidFunction;
  onForgetPassword: VoidFunction;
};

const FormLogin: FC<FormLoginProps> = ({
  mode,
  onSubmit,
  switchRegister,
  onForgetPassword,
}) => {
  const [seePassword, setSeePassword] = useState<boolean>(false);
  const [valueForm, setValueForm] = useState<ValueForm>({});

  const onChange = (e: any) => {
    setValueForm({ ...valueForm, [e.target.name]: e.target.value });
  };

  //MAIN RENDER
  return (
    <div className={styles.containerForm}>
      <Input
        name={NAME_FORM.EMAIL}
        className={styles.inputLogin}
        size="large"
        placeholder="Email"
        prefix={<UserOutlined />}
        onChange={onChange}
      />

      <Input
        name={NAME_FORM.PASSWORD}
        className={styles.inputLogin}
        size="large"
        placeholder="Mật khẩu"
        prefix={<LockOutlined />}
        suffix={
          <div
            className={styles.iconEye}
            onClick={() => setSeePassword(!seePassword)}
          >
            {seePassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
          </div>
        }
        type={seePassword ? "text" : "password"}
        onChange={onChange}
      />
      <div className={styles.forgetPassword} onClick={onForgetPassword}>
        Quên mật khẩu?
      </div>
      <Button
        className={styles.buttonLogin}
        color="default"
        variant="solid"
        onClick={() => onSubmit(valueForm)}
      >
        Đăng nhập ngay
      </Button>
      <div className={styles.switchRegister}>
        <p>Bạn chưa có tài khoản?</p>&nbsp;
        <p className={styles.textRegister} onClick={switchRegister}>
          Đăng kí tại đây
        </p>
      </div>
    </div>
  );
};

export { FormLogin };
