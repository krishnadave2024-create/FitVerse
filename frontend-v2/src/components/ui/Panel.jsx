import React from 'react';
import { cn } from './Button';

export function Panel({ children, className, ...props }) {
  return (
    <div className={cn("panel p-6", className)} {...props}>
      {children}
    </div>
  );
}
