import React from 'react';

export default function Avatar({ src, name, size = 'md', status, className = '' }) {
  const sizeMap = {
    xs: { px: 20, font: '10px' },
    sm: { px: 28, font: '11px' },
    md: { px: 34, font: '13px' },
    lg: { px: 42, font: '15px' },
    xl: { px: 56, font: '18px' }
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  const initials = name
    ? name
        .split(' ')
        .map(n => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'TS';

  const statusColorMap = {
    Online: '#10B981',
    'In Meeting': '#F59E0B',
    Away: '#F59E0B',
    Offline: '#94A3B8'
  };

  return (
    <div
      className={`avatar-wrapper ${className}`}
      style={{
        position: 'relative',
        display: 'inline-flex',
        flexShrink: 0
      }}
      title={name}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          style={{
            width: currentSize.px,
            height: currentSize.px,
            borderRadius: '50%',
            objectFit: 'cover',
            border: '2px solid #ffffff',
            boxShadow: '0 1px 2px rgba(0,0,0,0.08)'
          }}
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      ) : (
        <div
          style={{
            width: currentSize.px,
            height: currentSize.px,
            borderRadius: '50%',
            backgroundColor: 'var(--primary-100)',
            color: 'var(--primary-700)',
            fontWeight: 600,
            fontSize: currentSize.font,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid #ffffff',
            boxShadow: '0 1px 2px rgba(0,0,0,0.08)'
          }}
        >
          {initials}
        </div>
      )}

      {status && (
        <span
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: Math.max(8, currentSize.px * 0.28),
            height: Math.max(8, currentSize.px * 0.28),
            borderRadius: '50%',
            backgroundColor: statusColorMap[status] || '#94A3B8',
            border: '2px solid #ffffff',
            boxShadow: '0 0 2px rgba(0,0,0,0.1)'
          }}
          title={status}
        />
      )}
    </div>
  );
}
