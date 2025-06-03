import { useMutation } from "@apollo/client";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { LOGIN } from "@/graphql/mutations/User";
import {
  resetAuth,
  setIsAuthenticated,
  setLogin,
} from "@/redux/slices/authSlice";
import type { RootState } from "@/redux/store";
import store from "@/redux/store";
import type { DecodedToken, ILoginInput } from "@/utils/interfaces/User";
import { toast } from "sonner";

const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token, isAuthenticated } = useSelector(
    (state: RootState) => state.authSlice
  );
  const [loadingLogin, setLoadingLogin] = useState<boolean>(false);
  const [loginMutation] = useMutation(LOGIN);

  const login = async (credentials: ILoginInput) => {
    try {
      setLoadingLogin(true);
      const { data } = await loginMutation({ variables: credentials });
      const token = data?.loginLanding;

      if (token) {
        const decoded: DecodedToken = jwtDecode(token);
        dispatch(
          setLogin({
            token,
            isAuthenticated: decoded.access,
            id: decoded.id,
            fullName: decoded.fullName,
            email: decoded.email,
            type: decoded.type,
            picture: decoded.picture,
          })
        );
        navigate("/registrar-empresa");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoadingLogin(false);
    }
  };

  const logout = async () => {
    dispatch(resetAuth());
    localStorage.clear();
    navigate("/login");
  };

  const isTokenExpired = () => {
    const token = store.getState().authSlice.token;
    if (token) {
      const decoded: DecodedToken = jwtDecode(token);
      const currentTimestamp = Math.floor(Date.now() / 1000);
      return decoded?.exp && decoded.exp <= currentTimestamp;
    }
    return false;
  };

  const checkAuthentication = async () => {
    try {
      if (!token) {
        dispatch(setIsAuthenticated(false));
      } else {
        const isExpired = isTokenExpired();
        dispatch(setIsAuthenticated(isExpired ? false : true));
        if (isExpired && isAuthenticated) {
          await logout();
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
      dispatch(setIsAuthenticated(false));
    }
  };

  return {
    loadingLogin,
    isAuthenticated,
    login,
    logout,
    checkAuthentication,
  };
};

export default useAuth;
