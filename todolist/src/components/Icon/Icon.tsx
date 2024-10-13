import { CSSProperties } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export type IconProps = {
  icon: string;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
  type?: "regular" | "solid" | "brands"
};
export const Icon = (IconProps: IconProps) => {
  const getIcon = (component: any, type?: string) => {
    if (typeof component != "string") {
      return component;
    }
    switch (type) {
      case "brands":
        return require("@fortawesome/free-brands-svg-icons")[component];
      case "regular":
        return require("@fortawesome/free-regular-svg-icons")[component];
      case "solid":
      default:
        return require("@fortawesome/free-solid-svg-icons")[component];
    }
  };

  //Main render
  return (
    <span
      className={[IconProps.className].join(" ")}
      style={IconProps.style}
      onClick={IconProps.onClick}
    >
      <FontAwesomeIcon icon={getIcon(IconProps.icon, IconProps.type)} />
    </span>
  );
};
