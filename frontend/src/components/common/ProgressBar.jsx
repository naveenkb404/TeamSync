import React from 'react';

export default function ProgressBar({ value = 0, max = 100, height = 6, color = 'var(--primary-600)', showLabel = false }) {
  const percentage = Math.min(Math.max(0, Math.round((value / max) * 100)), 100);

  return (
    <div style={{ width: '100%' }}>
      {showLabel && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 12, color: 'var(--neutral-500)', fontWeight: 500 }}>
          <span>Progress</span>
          <span style={{ fontWeight: 600, color: 'var(--neutral-800)' }}>{percentage}%</span>
        </div>
      )}
      <div
        style={{
          width: '100%',
          height,
          backgroundColor: 'var(--neutral-100)',
          borderRadius: 9999,
          overflow: 'hidden',
          border: '1px solid var(--neutral-200)'
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: '100%',
            backgroundColor: color,
            borderRadius: 9999,
            transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />
      </div>
    </div>
  );
}
