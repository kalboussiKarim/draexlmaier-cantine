import React from "react";

export default function Button({
  children,
  textOnly,
  className,
  type,
  onClick,
  ...props
}) {
  let cssClasses = textOnly ? "text-button" : "button";
  cssClasses += " " + className;
  return (
    <button className={cssClasses} {...props} onClick={onClick}>
      {children}
    </button>
  );
}
