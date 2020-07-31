import React, { useState, useEffect } from "react";
import "./Popup.css";

/*
  Pull local state function from component to reuse it
  in the exported function anywhere in the app
*/
let setType;
let setMessage;
let setVisibility;

export function showPopup(type, message) {
  setType(type);
  setMessage(message);
  setVisibility(true);
}

window["p"] = showPopup;

let timeoutId;
export default function Popup() {
  let [type, set_type] = useState();
  let [isVisible, set_isVisible] = useState(false);
  let [message, set_message] = useState(false);

  setType = set_type;
  setMessage = set_message;
  setVisibility = set_isVisible;

  useEffect(() => {
    if (isVisible && message) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        set_isVisible(false);
      }, 2500);
    }
  }, [isVisible]);

  let className = (type === 'Error') ? "popup-red" : 'popup-green';
  if (!isVisible) {
    className += " hidden";
  }

  return <div className={className}>{message}</div>;
}
