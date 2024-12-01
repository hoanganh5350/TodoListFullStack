import { ArrowClockwise, BrowserEdge, Slack } from "react-bootstrap-icons";
import styles from "./Loading.module.scss";

export type LoadingProps = {
  isLoading?: boolean;
  className?: string;
};

const Loading = (props: LoadingProps) => {
  return props.isLoading == true ? (
    <div
      className={[
        "row justify-center align-center",
        styles.Loading,
        props.className,
      ].join(" ")}
    >
      <div className={styles.Animation}>
        <BrowserEdge size={35}/>
      </div>
    </div>
  ) : (
    <></>
  );
};
export default Loading;
