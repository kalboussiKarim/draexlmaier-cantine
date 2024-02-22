import React, { useContext, useEffect, useRef } from "react";
import logo from "../assets/logo.jpg";
import Button from "./Button";
import { CartContext } from "../store/cartContext";
import { createPortal } from "react-dom";
export default function Modal({ children, open, className = "" }) {
  const dialog = useRef();
  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    }
  }, [open]);
  const ctx = useContext(CartContext);
  return createPortal(
    <dialog ref={dialog} className={`model ${className}`}></dialog>,
    document.getElementById("modal")
  );
}
