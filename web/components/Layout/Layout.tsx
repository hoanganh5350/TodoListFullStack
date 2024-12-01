import { ReactNode, useEffect, useState } from "react";
import React from "react";
import styles from "./Layout.module.scss";
import { SideDrawer } from "../SideDrawer";
import {
  BoxArrowRight,
  Gear,
  ListTask,
  People,
  Person,
} from "react-bootstrap-icons";
import { Dropdown } from "../Dropdown";
import { useAuthContext } from "../Auth/AuthProvider";
import { httpRequest } from "../../utils/http";
import { useRouter } from "next/router";

export type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const { isAuthenticator } = useAuthContext();
  const [openDraw, setOpenDraw] = useState(false);

  const handleLogout = async () => {
    try {
      await httpRequest("POST", `user/logout`);
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const header = () => (
    <div className={`row ${styles.Header}`}>
      {/* Draw Utils */}
      <div className={`col-1 row align-center justify-center`}>
        <ListTask
          className={styles.IconDraw}
          size={26}
          onClick={() => setOpenDraw(true)}
        />
      </div>
      {/* Logo */}
      <div
        className={`col-10 row align-center justify-center ${styles.rowLogo}`}
      >
        <div className={`col-4 align-center justify-center ${styles.outLogo}`}>
          <img className={styles.logo} src={"/LogoTodo.png"} />
        </div>
        <div className={styles.titleLogo}>Todo Smart</div>
      </div>
      {/* Utils User */}
      <div
        className={`col-1 row align-center justify-end ${styles.rowUtilsUser}`}
      >
        <div className={`align-center justify-end ${styles.utilsUser}`}>
          <Dropdown
            classNameChildren={styles.dropSettingChildren}
            title={<Gear className={`${styles.icon}`} size={26} />}
            children={"Setting"}
            mode={"bubble"}
            bubblePosition={"end"}
          />
          <Dropdown
            classNameChildren={styles.dropSettingChildren}
            title={
              <div className={`align-center justify-end ${styles.UtilsUser}`}>
                <Person className={`${styles.icon}`} size={26} />
              </div>
            }
            children={
              <>
                <div onClick={handleLogout}>
                  <BoxArrowRight /> Đăng xuất
                </div>
              </>
            }
            mode={"bubble"}
            bubblePosition={"end"}
          />
        </div>
      </div>
    </div>
  );

  //Main render
  return (
    <div className={[styles.Layout].join(" ")}>
      {isAuthenticator && (
        <>
          {header()}
          <div className={styles.Body}>{children}</div>
          <SideDrawer
            className={[styles.SideDrawer].join(" ")}
            isOpen={openDraw}
            onClose={() => setOpenDraw(false)}
          >
            abc
          </SideDrawer>
        </>
      )}
    </div>
  );
};
export { Layout };
