"use client";
import React from "react";
interface Props {
  tag: "div" | "section" | "main" | "article" | "nav" | "header";
  className?: string;
  children?: React.ReactNode;
  onClick?: (e: any) => void
}
const CustomSection: React.FC<Props> = ({
  tag: Tag = "div",
  className,
  children,
  onClick
}) => {
  return <Tag className={className} onClick={onClick}>{children}</Tag>;
};

export default CustomSection;
