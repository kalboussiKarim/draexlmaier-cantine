import React from "react";

export default function Button({
  children,
  type = "button",
  textOnly = false,
  className = "",
  ...props
}) {
  let baseClass = textOnly ? "button text-only" : "button";

  return (
    <button type={type} className={`${baseClass} ${className}`} {...props}>
      {children}
    </button>
  );
}
