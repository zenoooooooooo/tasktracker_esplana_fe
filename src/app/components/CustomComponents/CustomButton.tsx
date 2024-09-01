"use client";
import React from "react";

interface Props {
  className?: string;
  onClick?: (e: any) => void;
  label: string;
  type: "button" | "submit" | "reset";
}

const LoginButton: React.FC<Props> = ({ className, onClick, label, type }) => {
  return (
    <button className={className} onClick={onClick} type={type}>
      {label}
    </button>
  );
};

export default LoginButton;
