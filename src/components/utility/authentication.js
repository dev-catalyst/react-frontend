import Cookies from "universal-cookie";

var cookie = new Cookies();

export const checkAuthenticatedUser = () => {
  if (cookie.get("token")) {
    return true;
  }
  return false;
};
export const authenticateUser = (token) => {
  cookie.set("token", token, { path: "/" });
};
