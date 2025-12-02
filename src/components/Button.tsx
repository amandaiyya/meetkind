"use client";

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

function Button({
    children,
    className,
    ...props
}: ButtonProps) {
  return (
    <button 
      className={`shadow-md cursor-pointer border-2 rounded font-semibold outline-none ${className}
        ${className?.includes("primary-dark") && "border-dark-secondary bg-dark-primary text-light-primary"}
        ${className?.includes("primary-light") && "border-dark-primary bg-light-primary text-dark-secondary"}
        ${className?.includes("secondary-dark") && "border-dark-secondary bg-light-primary text-dark-secondary"}
        ${className?.includes("secondary-light") && "border-light-primary bg-dark-tertiary text-light-primary"}
      `}
      {...props}
    >
        {children}
    </button>
  )
}

export default Button;
