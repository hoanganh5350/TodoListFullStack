import React, { Key, useEffect, useState } from "react";
import styles from "./NewTask.module.scss";
import { CheckBoxGroup, Dropdown, ItemTask } from "../../components";
import { Button, FloatButton, Input, Select, Space } from "antd/lib";
import { useRouter } from "next/router";
import NoSRR from "../../components/NoSRR";
import { Filter, PlusCircle, PlusLg, XCircle } from "react-bootstrap-icons";

const { Search } = Input;



const NewTask = () => {
  const router = useRouter();
  //MAIN RENDER
  return (
    <div className={`container ${styles.container}`}>
      <NoSRR>
        <div className={`row ${styles.headerNewTask}`}>Create New Task</div>

        <div className={`row ${styles.formNewTask}`}>
          <div className={`row ${styles.formValue}`}></div>
          <div className={`row justify-end ${styles.rowButton}`}>
            <Button className={styles.buttonCreate}>
              <PlusCircle size={14} />
              Tạo mới
            </Button>
            <Button className={styles.buttonCancel}>
              <XCircle size={14} />
              Hủy
            </Button>
          </div>
        </div>
      </NoSRR>
    </div>
  );
};

export default NewTask;
