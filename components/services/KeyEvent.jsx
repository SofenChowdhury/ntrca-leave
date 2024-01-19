import React, { useEffect } from "react";

export const KeyEvent = (key, cb, isCtrl) => {
  useEffect(() => {
    function handle(event) {
      if (!event.repeat) {
        if (isCtrl) {
          if (event.code === key && event.ctrlKey) {
            cb(event);
          }
        } else {
          if (event.code === key) {
            cb(event);
          }
        }
      }
    }
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [key]);
};

export const test = (email, password) => {
  console.log(email, password);
}

export default KeyEvent;
