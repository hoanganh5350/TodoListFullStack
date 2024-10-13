import { Key, ReactNode, useEffect, useState, useRef } from "react";
import React from "react";
import styles from "./Slickimage.module.scss";
import Slider from "react-slick";
import { Slick } from "../Slick/Slick";

export type SlickimageProps = {
  image?: string[];
  className?: string;
  indexImage?: number;
  classNamePaging?:string
};

export const Slickimage = (SlickimageProps: SlickimageProps) => {
  //Define constant
  const [props, setProps] = useState(SlickimageProps);
  const [value, setValue] = useState<number>(0);
  const slider = useRef<any>();

  //Function hook
  useEffect(() => {
    setProps(SlickimageProps);
  }, [SlickimageProps]);
  useEffect(() => {
    props.indexImage && setValue(props.indexImage);
  }, [props.indexImage]);
  useEffect(() => {
    // Sử dụng slickGoTo để di chuyển đến slide mong muốn
    if (slider.current) {
      slider.current.slickGoTo(value); // Di chuyển đến slide thứ 3 (bắt đầu từ 0)
    }
  }, [value, slider.current]);

 //Function to render
 const pagingSlick = () => {
  return (
    <Slick
      className={[
        styles.pagingSlickImages,
        props.classNamePaging,
      ].join(" ")}
      slidesToShow={4}
      swipeToSlide={true}
      dots={false}
      sizeArrow="small"
      infinite={false}
    >
      {props.image &&
        props.image.length > 0 &&
        props.image.map((item: any, key: number) => {
          return (
            <div
              key={key}
              className={["col justify-center", styles.OutImagesPaging].join(
                " "
              )}
            >
              <img
                className={styles.imgPaging}
                src={item}
                alt="Not Found"
                onClick={() => {
                  props.image && setValue(key);
                }}
              />
            </div>
          );
        })}
    </Slick>
  );
};
//Main render
return (
  <div className={[, styles.OutSlickImage].join(" ")}>
    {props.image && props.image?.length > 1 ? (
      <>
        <Slider
          ref={slider}
          className={[, styles.SlickImages, props.className].join(" ")}
          slidesToShow={1}
          swipeToSlide={true}
          dots={false}
          arrows={false}
        >
          {props.image &&
            props.image.length > 0 &&
            props.image.map((item: any, key: Key) => {
              return (
                <div
                  key={key}
                  className={["col justify-center", styles.OutImages].join(
                    " "
                  )}
                >
                  <img className={styles.img} src={item} alt="Not Found" />
                </div>
              );
            })}
        </Slider>
        {pagingSlick()}
      </>
    ) : (
      <div className={[styles.OutImages, props.className].join(" ")}>
        <img
          className={styles.img}
          src={props.image && props.image[0]}
          alt="Not Found"
        />
      </div>
    )}
  </div>
);
};
Slickimage.deafultProps = {};
