import React from "react";
import clsx from "clsx"; // facultatif, tu peux aussi utiliser des templates strings

interface BadgeProps {
  children: React.ReactNode;
  variant?: "success" | "warning" | "neutral" | "outline";
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = "neutral" }) => {
  const base = "text-xs px-3 py-1 rounded-full font-semibold inline-block";

  const variantStyles = {
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    neutral: "bg-gray-100 text-gray-800",
    outline: "border border-gray-300 text-gray-700 bg-white"
  };

  return <span className={clsx(base, variantStyles[variant])}>{children}</span>;
};
