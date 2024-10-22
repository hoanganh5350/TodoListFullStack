import React, { FC, useRef, useState } from "react";
import styles from "./Styles.module.scss";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Input, Button, InputRef } from "antd";
import { HeaderLogin } from "./HeaderLogin";
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
  onSubmit: (value: ValueForm) => void;
  switchRegister: VoidFunction;
  onForgetPassword: VoidFunction;
};

const FormLogin: FC<FormLoginProps> = ({
  onSubmit,
  switchRegister,
  onForgetPassword,
}) => {
  const [seePassword, setSeePassword] = useState<boolean>(false);
  const [valueForm, setValueForm] = useState<ValueForm>({});
  const refInputPassword = useRef<InputRef>(null);

  const onChange = (e: any) => {
    setValueForm({ ...valueForm, [e.target.name]: e.target.value });
  };

  //MAIN RENDER
  return (
    <>
      <HeaderLogin mode={MODE_LOGIN.LOGIN} />
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
          ref={refInputPassword}
          className={styles.inputLogin}
          size="large"
          placeholder="Mật khẩu"
          prefix={<LockOutlined />}
          suffix={
            <div
              className={styles.iconEye}
              onClick={() => {
                setSeePassword(!seePassword);
                setTimeout(() => {
                  const passwordLength = valueForm[NAME_FORM.PASSWORD]
                    ? valueForm[NAME_FORM.PASSWORD]?.length
                    : 0;
                  if (!refInputPassword.current) return;
                  refInputPassword.current.setSelectionRange(
                    passwordLength,
                    passwordLength
                  );
                }, 10);
              }}
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
    </>
  );
};

export { FormLogin };
