import React from "react";
import styles from "./Button.module.css";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "back" | "position";
};

function Button({
  className: cn = "",
  variant = "primary",
  ...props
}: ButtonProps) {
  const vrc = styles[variant];
  return <button className={`${styles.btn} ${vrc} ${cn}`.trim()} {...props} />;
}

export default Button;
