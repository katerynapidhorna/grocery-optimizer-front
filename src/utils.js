import { NOT_AUTHORISED_STATUS_CODE } from "./constants";
import { showPopup } from "./components/Popup";
import { browserHistory } from "react-router";

// https://levelup.gitconnected.com/ways-to-clone-an-object-in-javascript-e1e5beaaf564
export function cloneObj(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/*
  Generic way of handling apollo client network errors
  Relies on passed history object
*/
export function handleNetworkError(error, history) {
  if (
    error.networkError &&
    error.networkError.statusCode === NOT_AUTHORISED_STATUS_CODE
  ) {
    setTimeout(() => {
      showPopup("Error", "Unauthorised");
      history.push("/login");
    }, 0);
  }
}
