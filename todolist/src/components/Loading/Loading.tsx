import { useRecoilValue } from "recoil";
import { LoadingAtom } from "../../atom";
import styles from "./Loading.module.scss";
import { Icon } from "../Icon";

export type LoadingProps = {};

const Loading = (LoadingProps: LoadingProps) => {
  const loading = useRecoilValue(LoadingAtom);
  return loading ? (
    <div
      className={[
        "row justify-center align-center",
        styles.Loading,
      ].join(" ")}
    >
      <div className={styles.Animation}>
        <Icon icon="faSpinner" />
      </div>
    </div>
  ) : (
    <></>
  );
};
export default Loading;
