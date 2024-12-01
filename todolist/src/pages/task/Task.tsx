import React, { Key, useEffect, useState } from "react";
import styles from "./Task.module.scss";
import { CheckBoxGroup, Dropdown, ItemTask, NoteBox } from "@/components";
import { Button, FloatButton, Input, Select, Space } from "antd/lib";
import { Filter, People, PlusLg, PlusSquare } from "react-bootstrap-icons";
import { IUserDetails } from "@/components/NoteBox/NoteBox";

const listTaskFake = [
  {
    iconSubTask: <People />,
    open: true,
    title: "Nhiệm vụ số 1",
    listUserMention: [
      {
        id: 1,
        userName: "Hoàng Anh",
      },
      {
        id: 1,
        userName: "Giang",
      },
      {
        id: 1,
        userName: "Vân",
      },
    ],
  },
  {
    iconSubTask: <People />,
    open: true,
    title: "Nhiệm vụ số 1",
    listUserMention: [
      {
        id: 1,
        userName: "Hoàng Anh",
      },
      {
        id: 1,
        userName: "Giang",
      },
      {
        id: 1,
        userName: "Vân",
      },
    ],
  },
  {
    iconSubTask: <People />,
    open: true,
    title: "Nhiệm vụ số 1",
    listUserMention: [
      {
        id: 1,
        userName: "Hoàng Anh",
      },
      {
        id: 1,
        userName: "Giang",
      },
      {
        id: 1,
        userName: "Vân",
      },
    ],
  },
  {
    iconSubTask: <People />,
    open: true,
    title: "Nhiệm vụ số 1",
    listUserMention: [
      {
        id: 1,
        userName: "Hoàng Anh",
      },
      {
        id: 1,
        userName: "Giang",
      },
      {
        id: 1,
        userName: "Vân",
      },
    ],
  },
  {
    iconSubTask: <People />,
    open: true,
    title: "Nhiệm vụ số 1",
    listUserMention: [
      {
        id: 1,
        userName: "Hoàng Anh",
      },
      {
        id: 1,
        userName: "Giang",
      },
      {
        id: 1,
        userName: "Vân",
      },
    ],
  },
];

const Task = () => {
  const [listSubTask, setListSubTask] = useState(listTaskFake);
  //MAIN RENDER
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.headerFilter}`}>
        <div className={`${styles.titleTask}`}>
          Task 1 (Nhiệm vụ chi tiết) - ID:2342
        </div>
        <Dropdown
          classNameChildren={styles.dropFilterChildren}
          title={
            <div className={`${styles.filter}`}>
              <Filter size={25} />
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
      <div className={`${styles.containerList}`}>
        {listSubTask.map((item, key: Key) => (
          <div className={styles.outsubTask} key={key}>
            <NoteBox
              className={styles.subTask}
              {...item}
              onChange={(e: string, mention?: IUserDetails[]) => {
                console.log("value >>>>", JSON.parse(e));
                console.log("arr User >>>>", mention);
              }}
            />
          </div>
        ))}
      </div>
      <FloatButton
        icon={<PlusLg />}
        tooltip={<div>Create more sub task</div>}
      />
      ;
    </div>
  );
};

export default Task;
