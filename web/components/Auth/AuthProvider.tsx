import React, { useState, useEffect, createContext, useContext } from "react";
import { useRouter } from "next/router";
import { httpRequest } from "../../utils/http";
import Loading from "../Loading/Loading";

const AuthContext = createContext<any>(undefined);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }: any) => {
  //define constants
  const router = useRouter();
  const pageNonAuth = ["login"];
  const pageRouter = router.pathname.split("/")[1] ?? "";
  const [isAuthenticator, setIsAuthenticator] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const calLData = async () => {
    setIsLoading(true);
    try {
      const checkAuthAndGetData = (await httpRequest(
        "POST",
        `auth/auth`,
        {}
      )) as { auth: boolean; dataUser?: any };

      const auth = checkAuthAndGetData?.auth;

      setIsAuthenticator(auth);

      if (checkAuthAndGetData.dataUser) {
        setUserData(checkAuthAndGetData.dataUser);
      }
      //protech page
      if (!pageNonAuth.includes(pageRouter) && !auth) {
        router.push("/login");
      }

      //còn session nhưng vào trang login
      if (pageNonAuth.includes(pageRouter) && auth) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      router.push("/login");
    } finally {
      setIsLoading(false);
    }
  };

  //functions to create

  //functions to handle actions
  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  //functions to hook
  useEffect(() => {
    calLData();
  }, []);

  //MAIN RENDER
  return (
    <AuthContext.Provider
      value={{ isAuthenticator, userData, isLoading, setLoading }}
    >
      {children}
      <Loading isLoading={isLoading} />
    </AuthContext.Provider>
  );
};

export { AuthProvider };
