import dynamic from "next/dynamic";
import React, { Fragment } from "react";
const SSR = (props: {
  children:
    | string
    | number
    | bigint
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | Promise<React.AwaitedReactNode>
    | null
    | undefined;
}): JSX.Element => <Fragment>{props.children}</Fragment>;
export default dynamic(() => Promise.resolve(SSR), {
  ssr: true,
});
