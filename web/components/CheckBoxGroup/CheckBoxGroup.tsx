import React, { useMemo, useState } from "react";
import style from "./CheckBoxGroup.module.scss";
import { Checkbox, Divider } from "antd/lib";
import type { CheckboxProps } from "antd/lib";

type ItemCheck = {
  label: string;
  value: string | number;
};

type ItemCheckKey = {
  key: number;
  label: string;
  value: string | number;
};

export enum TYPE_CHECK_LIST {
  COL = "COLUM",
  ROW = "ROW",
}

interface CheckBoxGroupProps {
  classNameCheckBox?: string;
  classNameListCheck?: string;
  classNameLabelList?: string;
  typeCheckList?: TYPE_CHECK_LIST;
  hasCheckAll?: boolean;
  options: ItemCheck[];
  optionsDefault?: ItemCheck[];
  onChangeCheckBox?: (e: ItemCheck[]) => VoidFunction;
}

const convertValueOnChange = (arrValue: ItemCheckKey[]): ItemCheck[] =>
  arrValue.map((item: ItemCheckKey) => {
    const { key, ...newData } = item;
    return newData;
  });

export const CheckBoxGroup = ({
  hasCheckAll = true,
  classNameCheckBox,
  classNameListCheck,
  classNameLabelList,
  typeCheckList = TYPE_CHECK_LIST.COL,
  options,
  optionsDefault = [],
  onChangeCheckBox,
}: CheckBoxGroupProps): JSX.Element => {
  const listOption = useMemo(
    (): ItemCheckKey[] =>
      options.map((item: ItemCheck, key: number) => ({ key, ...item })),
    [options]
  );
  const listOptionDefault = useMemo(
    (): ItemCheckKey[] =>
      optionsDefault.map((item: ItemCheck, key: number) => ({ key, ...item })),
    [optionsDefault]
  );
  const [checkedList, setCheckedList] =
    useState<ItemCheckKey[]>(listOptionDefault);

  const checkAll = options.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < options.length;

  const onChange = (itemCheck: ItemCheckKey) => {
    const isCheck =
      checkedList.length !== 0 &&
      !!checkedList.find((item: ItemCheckKey) => item.key === itemCheck.key);
    const arrRemove: ItemCheckKey[] = checkedList.filter(
      (item: ItemCheckKey) => item.key !== itemCheck.key
    );
    const newList = isCheck ? arrRemove : [...checkedList, itemCheck];
    onChangeCheckBox && onChangeCheckBox(convertValueOnChange(newList));
    setCheckedList(newList);
  };

  const onCheckAllChange: CheckboxProps["onChange"] = (e) => {
    const newList = e.target.checked ? listOption : [];
    onChangeCheckBox && onChangeCheckBox(convertValueOnChange(newList));
    setCheckedList(newList);
  };

  return (
    <div className={`${style.containerCheckBox} ${classNameCheckBox}`}>
      {hasCheckAll && (
        <>
          <Checkbox
            indeterminate={indeterminate}
            onChange={onCheckAllChange}
            checked={checkAll}
          >
            Check all
          </Checkbox>
          <Divider className={style.divider} />
        </>
      )}
      <div
        className={`${style.containerCheckBoxList} ${
          typeCheckList === TYPE_CHECK_LIST.COL
            ? style.checkListCol
            : style.checkListRow
        } ${classNameListCheck}`}
      >
        {listOption.length !== 0 &&
          listOption.map((item: ItemCheckKey) => (
            <label
              key={item.key}
              className={`${style.labelList} ${
                typeCheckList === TYPE_CHECK_LIST.COL
                  ? style.labelListCol
                  : style.labelListRow
              } ${classNameLabelList}`}
            >
              <Checkbox
                onChange={() => onChange(item)}
                checked={
                  checkedList.length !== 0 &&
                  !!checkedList.find((el: ItemCheckKey) => el.key === item.key)
                }
              >
                {item.label}
              </Checkbox>
            </label>
          ))}
      </div>
    </div>
  );
};
