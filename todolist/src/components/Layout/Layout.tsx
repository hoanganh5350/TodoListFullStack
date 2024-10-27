import { ReactNode, useEffect, useState } from "react";
import React from "react";
import styles from "./Layout.module.scss";
import { SideDrawer } from "../SideDrawer";
import { Gear, ListTask, People, Person } from "react-bootstrap-icons";
import { Dropdown } from "../Dropdown";

export type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [openDraw, setOpenDraw] = useState(false);

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
        className={`col-9 row align-center justify-center ${styles.rowLogo}`}
      >
        <div className={`col-4 align-center justify-center ${styles.outLogo}`}>
          <img className={styles.logo} src={"/LogoTodo.png"} />
        </div>
        <div className={styles.titleLogo}>Todo Smart</div>
      </div>
      {/* Utils User */}
      <div
        className={`col-2 row align-center justify-end ${styles.rowUtilsUser}`}
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
            children={"Setting"}
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
      {header()}
      <div className={styles.Body}>{children}</div>
      <SideDrawer
        className={[styles.SideDrawer].join(" ")}
        isOpen={openDraw}
        onClose={() => setOpenDraw(false)}
      >
        abc
      </SideDrawer>
    </div>
  );
};
export { Layout };
