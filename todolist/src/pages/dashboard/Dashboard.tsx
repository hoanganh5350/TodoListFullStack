import React, { Key, useEffect, useState } from "react";
import styles from "./Dashboard.module.scss";
import { CheckBoxGroup, Dropdown, ItemTask } from "@/components";
import { Button, FloatButton, Input, Select, Space } from "antd";
import { useRouter } from "next/router";
import NoSRR from "@/components/NoSRR";
import { Filter, PlusLg } from "react-bootstrap-icons";

const { Search } = Input;

const listTaskFake = [
  { title: "Task 1", note: true, timeExpired: 234234237782 },
  { title: "Task 1", note: true, timeExpired: 234234237782 },
  { title: "Task 1", note: true, timeExpired: 234234237782 },
  { title: "Task 1", note: false, timeExpired: 234234237782 },
  { title: "Task 1", note: false, timeExpired: 234234237782 },
  { title: "Task 1", note: false, timeExpired: 234234237782 },
  { title: "Task 1", note: false, timeExpired: 234234237782 },
];

const Dashboard = () => {
  const [listTask, setListTask] = useState(listTaskFake);
  const router = useRouter();
  //MAIN RENDER
  return (
    <div className={`${styles.container}`}>
      <NoSRR>
        <div className={`${styles.searchBox}`}>
          <Search
            className={`${styles.inputSearch}`}
            size="large"
            placeholder="input search text"
            allowClear
          />
          <Dropdown
            classNameChildren={styles.dropFilterChildren}
            title={
              <div className={`${styles.filter}`}>
                <Filter size={30} />
              </div>
            }
            children={
              <CheckBoxGroup
                options={[
                  { label: "New", value: "New" },
                  { label: "Note", value: "Note" },
                  { label: "Create by me", value: "Create by me" },
                ]}
              />
            }
            mode={"bubble"}
            bubblePosition={"end"}
          />
        </div>
        <div className={`${styles.containerListTask}`}>
          {listTask.map((item, key: Key) => (
            <ItemTask
              key={key}
              onClick={() => router.push("/task")}
              {...item}
              onNote={() => console.log("note task")}
            />
          ))}
        </div>
        <FloatButton icon={<PlusLg />} tooltip={<div>Create more task</div>} />
      </NoSRR>
    </div>
  );
};

export default Dashboard;
