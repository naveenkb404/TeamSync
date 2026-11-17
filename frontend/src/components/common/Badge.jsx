import React from 'react';

export default function Badge({ children, variant = 'neutral', size = 'md', dot = false, icon: Icon, className = '' }) {
  const variantMap = {
    primary: 'ts-badge-primary',
    success: 'ts-badge-success',
    warning: 'ts-badge-warning',
    danger: 'ts-badge-danger',
    neutral: 'ts-badge-neutral',
    purple: 'ts-badge-purple'
  };

  const dotColorMap = {
    primary: 'var(--primary-600)',
    success: 'var(--success-500)',
    warning: 'var(--warning-500)',
    danger: 'var(--danger-500)',
    neutral: 'var(--neutral-400)',
    purple: 'var(--purple-500)'
  };

  const badgeClass = `ts-badge ${variantMap[variant] || 'ts-badge-neutral'} ${
    size === 'sm' ? 'ts-badge-sm' : ''
  } ${className}`;

  return (
    <span className={badgeClass}>
      {dot && (
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            backgroundColor: dotColorMap[variant] || 'currentColor',
            display: 'inline-block'
          }}
        />
      )}
      {Icon && <Icon size={size === 'sm' ? 12 : 13} />}
      {children}
    </span>
  );
}
