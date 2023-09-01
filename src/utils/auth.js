export const isAutheticated = () => {
  if (typeof window == "undefined") {
    return true;
  }
  if (localStorage.getItem("AdminAuth")) {
    return JSON.parse(localStorage.getItem("AdminAuth"));
  } else {
    console.log(JSON.parse(localStorage.getItem("AdminAuth")));
    return false;
  }
};

export const signout = () => {
  localStorage.removeItem("AdminAuth");
  return true;
};
