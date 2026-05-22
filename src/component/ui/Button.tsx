import type React from "react";

interface buttonProps {
  title: string; 
  variant: string;
  className?: string; 
}

export const Button: React.FC<buttonProps> = ({ title, variant, className = "" }) => {
  const primary = "bg-red-900 px-6 py-2 text-white rounded-full hover:bg-red-800 transition-all";
  const outline = "border border-red-900 px-6 py-2 text-red-900 rounded-full hover:bg-red-50 transition-all";

  return (
    <button 
      className={`${variant === "primary" ? primary : outline} ${className}`}
    >
      {title}
    </button>
  );
};

export default Button;