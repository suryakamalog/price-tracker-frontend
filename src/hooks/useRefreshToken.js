import { useDispatch } from "react-redux";
import axios from "../api/axios";
import { authActions } from "../store/auth";

const useRefreshToken = () => {

  const dispatch = useDispatch()
  const refresh = async () => {
    const response = await axios.post(
      "/api/token/refresh/",
      JSON.stringify({
        refresh: localStorage.getItem('refresh_token'),
      }),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    localStorage.setItem('refresh_token', response.data.refresh)
    dispatch(authActions.login({access: response.data.access, refresh: response.data.refresh}));
    return response.data.access;
  };
  return refresh;
};

export default useRefreshToken;
