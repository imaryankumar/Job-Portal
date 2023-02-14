import { useRouter } from "next/router";
import React, {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
type TuserContext = {
  isLoggedIN?: boolean;
  user?: Tuser;
  setLoggin: (data: Tuser) => void;
  setLogout: () => void;
};
export type Tuser = {
  email: string;
  name: string;
  skills: string;
  userRole: 0 | 1;
  createdAt: string;
  updatedAt: string;
  id: string;
  token: string;
};
export const authcontext = createContext<TuserContext>({
  isLoggedIN: undefined,
  setLoggin: () => {},
  setLogout: () => {},
});

type Props = {};
const ContextAPI: FC<PropsWithChildren<Props>> = ({ children }) => {
  const [islogged, setIsLogged] = useState<boolean>(); //get value from localstorage
  const [user, setUser] = useState<Tuser>();
  const router = useRouter();
  const handleLoggedIn = useCallback((data: Tuser) => {
    //set
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
    setIsLogged(true);
    if (data?.userRole !== undefined) {
      if (
        data?.userRole === 0 &&
        !router.asPath.includes("/jobs-posted-by-you") &&
        !router.asPath.includes("/post-job")
      ) {
        router.push("/jobs-posted-by-you?page=1");
      } else if (
        data?.userRole === 1 &&
        !router.asPath.includes("/jobs-for-you") &&
        !router.asPath.includes("/applied-jobs")
      ) {
        router.push("/jobs-for-you?page=1");
      }
    }
    // post job
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.token) {
      handleLoggedIn(user);
    } else {
      setIsLogged(false);
    }
  }, [handleLoggedIn]);

  const handleLoggedOut = () => {
    //set
    setUser(undefined);
    localStorage.removeItem("user");
    setIsLogged(false);
    router.push("/");
    toast.info("You have successfully logged out.");
  };

  return (
    <authcontext.Provider
      value={{
        isLoggedIN: islogged,
        setLoggin: handleLoggedIn,
        user,
        setLogout: handleLoggedOut,
      }}
    >
      {children}
    </authcontext.Provider>
  );
};

export default ContextAPI;
