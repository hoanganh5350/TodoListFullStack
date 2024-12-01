import Layout from "@/components";
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { AuthProvider } from "@/contextApi/Auth/AuthProvider";
import NoSRR from "@/components/NoSRR";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const pathNoLayout = ["login"];
  const pathFrist = router.pathname.split("/")[1] ?? "";
  return (
    <NoSRR>
      <AuthProvider>
        {pathNoLayout.includes(pathFrist) ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </AuthProvider>
    </NoSRR>
  );
}
