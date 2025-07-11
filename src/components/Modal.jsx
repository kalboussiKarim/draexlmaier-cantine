import React, { useContext, useEffect, useRef } from "react";
import logo from "../assets/logo.jpg";
import Button from "./Button";
import { CartContext } from "../store/cartContext";
import { createPortal } from "react-dom";
export default function Modal({ children, open, className = "" }) {
  const dialog = useRef();
  useEffect(() => {
    const modal = dialog.current;
    if (open) {
      modal.showModal();
    }
    return () => {
      modal.close();
    };
  }, [open]);
  const ctx = useContext(CartContext);
  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
