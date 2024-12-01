import React, { useState, useEffect, createContext, useContext } from "react";
import { useRouter } from "next/router";
import { httpRequest } from "../../../utils/http";
import { Loading } from "@/components/Loading";

const AuthContext = createContext<any>(undefined);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }: any) => {
  //define constants
  const router = useRouter();
  const pageRouter = router.pathname.split("/")[1];
  const [isAuthenticator, setIsAuthenticator] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const calLData = async () => {
    try {
      const auth = await httpRequest("GET", `auth`, {});
      console.log(auth);
    } catch (error) {
      console.log(error);
    }
  };

  //functions to create

  //functions to handle actions
  const isLoading = (loading: boolean) => {
    setLoading(loading);
  };

  //functions to hook
  useEffect(() => {
    if (!process.env.PAGE_UN_AUTH?.includes(pageRouter)) {
      calLData();
    }
  }, [pageRouter, loading]);

  //MAIN RENDER
  return (
    <AuthContext.Provider value={{ isAuthenticator, userData, isLoading }}>
      {children}
      <Loading isLoading={loading} />
    </AuthContext.Provider>
  );
};

export { AuthProvider };
