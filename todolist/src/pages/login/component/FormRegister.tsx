import React, { FC, Fragment, useRef, useState } from "react";
import styles from "./Styles.module.scss";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  AuditOutlined,
  ContactsOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Input, Button, InputRef } from "antd";
import { HeaderLogin } from "./HeaderLogin";
import { MODE_LOGIN, TYPE_INPUT } from "../interface";
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

  const arrFormRegister = [
    {
      name: NAME_FORM_REGISTER.FULL_NAME,
      typeInput: TYPE_INPUT.TEXT,
      placeholder: "Nhập họ tên đầy đủ",
      prefix: <AuditOutlined />,
    },
    {
      name: NAME_FORM_REGISTER.USER_NAME,
      typeInput: TYPE_INPUT.TEXT,
      placeholder: "Tên người dùng",
      prefix: <AuditOutlined />,
    },
    {
      name: NAME_FORM_REGISTER.ADDRESS,
      typeInput: TYPE_INPUT.TEXT,
      placeholder: "Địa chỉ",
      prefix: <ContactsOutlined />,
    },
    {
      name: NAME_FORM_REGISTER.EMAIL,
      typeInput: TYPE_INPUT.TEXT,
      placeholder: "Email",
      prefix: <UserOutlined />,
    },
    {
      name: NAME_FORM_REGISTER.PHONE,
      typeInput: TYPE_INPUT.TEXT,
      placeholder: "Số điện thoại",
      prefix: <PhoneOutlined />,
    },
    {
      name: NAME_FORM_REGISTER.PASSWORD,
      typeInput: TYPE_INPUT.PASSWORD,
      placeholder: "Mật khẩu",
      prefix: <LockOutlined />,
    },
  ];

  //MAIN RENDER
  return (
    <>
      <HeaderLogin mode={MODE_LOGIN.REGISTER} />
      <div className={styles.containerForm}>
        {arrFormRegister.map((item, idx: number) => (
          <Fragment key={idx}>
            {item.typeInput === TYPE_INPUT.PASSWORD ? (
              <Input
                name={item.name}
                ref={refInputPassword}
                className={styles.inputLogin}
                size="large"
                placeholder={item.placeholder}
                prefix={item.prefix}
                suffix={
                  <div
                    className={styles.iconEye}
                    onClick={() => {
                      setSeePassword(!seePassword);
                      setTimeout(() => {
                        const passwordLength = values[
                          NAME_FORM_REGISTER.PASSWORD
                        ]
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
                onChange={(e) => onChange(item.name, e)}
              />
            ) : (
              <Input
                name={item.name}
                className={styles.inputLogin}
                size="large"
                placeholder={item.placeholder}
                prefix={item.prefix}
                onChange={(e) => onChange(item.name, e)}
              />
            )}
          </Fragment>
        ))}

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
