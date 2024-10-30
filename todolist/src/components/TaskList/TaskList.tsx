import React, { ReactNode, useState } from "react";
import styles from "./TaskList.module.scss";
import {
  CircleFill,
  ClockHistory,
  Star,
  StarFill,
  ThreeDotsVertical,
  XLg,
} from "react-bootstrap-icons";

export type ItemTaskProps = {
  title: string;
  note: boolean;
  timeExpired: number;
  onClick: () => void;
  onNote: () => void;
};

const ItemTask = ({
  title,
  note,
  timeExpired,
  onClick,
  onNote,
}: ItemTaskProps): JSX.Element => {
  const currTime = new Date().getTime();

  const timeIcon = () => {
    switch (true) {
      case timeExpired >= currTime: {
        return <CircleFill size={15} />;
      }
      case timeExpired < currTime: {
        return <ClockHistory size={15} />;
      }
      default:
        return <ClockHistory size={15} />;
    }
  };
  return (
    <div className={styles.containerItemTask}>
      <div className={styles.timeStatus}>{timeIcon()}</div>
      <div className={styles.title} onClick={onClick}>
        {title}
      </div>
      {note ? (
        <StarFill className={styles.iconNote} onClick={onNote} />
      ) : (
        <Star className={styles.iconNote} onClick={onNote} />
      )}
      <ThreeDotsVertical className={styles.extents} />
    </div>
  );
};

export { ItemTask };
