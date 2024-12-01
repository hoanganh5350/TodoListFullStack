import Layout, { AuthProvider, ToastifyContext } from "../components";
import React from "react";
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import NoSRR from "../components/NoSRR";

export default function App({ Component, pageProps }: AppProps) {
  if (typeof window === "undefined") return <></>;
  const router = useRouter();
  const pathNoLayout = ["login"];
  const pathFrist = router.pathname.split("/")[1] ?? "";
  return (
    <NoSRR>
      <AuthProvider>
        <ToastifyContext>
          {pathNoLayout.includes(pathFrist) ? (
            <Component {...pageProps} />
          ) : (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          )}
        </ToastifyContext>
      </AuthProvider>
    </NoSRR>
  );
}
