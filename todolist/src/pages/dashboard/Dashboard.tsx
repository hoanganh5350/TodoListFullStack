import React, { Key, useEffect, useState } from "react";
import styles from "./Dashboard.module.scss";
import { ItemTask } from "@/components";
import { Button, Input, Select, Space } from "antd";
import { useRouter } from "next/router";
import NoSRR from "@/components/NoSRR";

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
      </NoSRR>
    </div>
  );
};

export default Dashboard;
