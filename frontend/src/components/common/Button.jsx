import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) {
  const variantClass = `ts-btn-${variant}`;
  const sizeClass = size === 'sm' ? 'ts-btn-sm' : size === 'lg' ? 'ts-btn-lg' : '';

  return (
    <button
      type={type}
      className={`ts-btn ${variantClass} ${sizeClass} ${className}`}
      disabled={disabled}
      onClick={onClick}
      style={{
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer'
      }}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon size={size === 'sm' ? 14 : 16} />}
      {children}
      {Icon && iconPosition === 'right' && <Icon size={size === 'sm' ? 14 : 16} />}
    </button>
  );
}
