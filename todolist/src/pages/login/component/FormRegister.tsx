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
import { useFormik } from "formik";

export enum NAME_FORM_REGISTER {
  FULL_NAME = "fullName",
  USER_NAME = "userName",
  ADDRESS = "address",
  EMAIL = "email",
  PHONE = "phone",
  PASSWORD = "password",
}

type ValueForm = {
  [NAME_FORM_REGISTER.FULL_NAME]?: string;
  [NAME_FORM_REGISTER.USER_NAME]?: string;
  [NAME_FORM_REGISTER.ADDRESS]?: string;
  [NAME_FORM_REGISTER.EMAIL]?: string;
  [NAME_FORM_REGISTER.PHONE]?: string;
  [NAME_FORM_REGISTER.PASSWORD]?: string;
};

type FormRegisterProps = {
  onSubmitForm: (value: ValueForm) => void;
  switchLogin: VoidFunction;
};

const FormRegister: FC<FormRegisterProps> = ({ onSubmitForm, switchLogin }) => {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      userName: "",
      address: "",
      email: "",
      phone: "",
      password: "",
    },
    onSubmit: onSubmitForm,
  });
  const [seePassword, setSeePassword] = useState<boolean>(false);
  const refInputPassword = useRef<InputRef>(null);
  const { values, setFieldValue } = formik;

  const onChange = (nameField: NAME_FORM_REGISTER, e: any) => {
    setFieldValue(nameField, e.target.value);
  };

  //MAIN RENDER
  return (
    <>
      <HeaderLogin mode={MODE_LOGIN.EMAIL} />
      <div className={styles.containerForm}>
        <Input
          name={NAME_FORM_REGISTER.EMAIL}
          className={styles.inputLogin}
          size="large"
          placeholder="Email"
          prefix={<UserOutlined />}
          onChange={(e) => onChange(NAME_FORM_REGISTER.EMAIL, e)}
        />

        <Input
          name={NAME_FORM_REGISTER.PASSWORD}
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
                  const passwordLength = values[NAME_FORM_REGISTER.PASSWORD]
                    ? values[NAME_FORM_REGISTER.PASSWORD]?.length
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
          onChange={(e) => onChange(NAME_FORM_REGISTER.PASSWORD, e)}
        />
        <Button className={styles.buttonLogin}>Đăng ký ngay</Button>
        <div className={styles.switchRegister}>
          <p>Bạn đã có tài khoản?</p>&nbsp;
          <p className={styles.textRegister} onClick={switchLogin}>
            Đăng nhập tại đây
          </p>
        </div>
      </div>
    </>
  );
};

export { FormRegister };
