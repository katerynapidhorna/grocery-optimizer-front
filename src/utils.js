import { NOT_AUTHORISED_STATUS_CODE } from "./constants";
import { showPopup } from "./components/Popup";

// https://levelup.gitconnected.com/ways-to-clone-an-object-in-javascript-e1e5beaaf564
export function cloneObj(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/*
  Generic way of handling apollo client network errors
  Relies on passed history object
*/
export function handleNetworkError(error, history) {
  function authError() {
    setTimeout(() => {
      showPopup("Error", "Unauthorised");
      localStorage.removeItem("jwt");
      history.push("/login");
    }, 0);
  }

  if (
    error.networkError &&
    error.networkError.statusCode === NOT_AUTHORISED_STATUS_CODE
  ) {
    authError();
  } else if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.error === "JsonWebTokenError"
  ) {
    authError();
  } else {
    showPopup("Error", error.message);
  }
  console.dir(error);
}
