"use client";
import React from "react";

interface Props {
  type: string;
  placeholder: string;
  className: string;
  name: string;
  onChange: (e: any) => void;
  value?: string;
  defaultValue?: string;
}

const CustomInput: React.FC<Props> = ({
  type,
  placeholder,
  className,
  name,
  onChange,
  value,
  defaultValue,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={className}
      name={name}
      onChange={onChange}
      value={value}
      defaultValue={defaultValue}
    />
  );
};

export default CustomInput;
