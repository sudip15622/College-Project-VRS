"use client"
import React, { forwardRef } from 'react'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ 
  label, 
  error, 
  className = "",
  ...props 
}, ref) => {
  return (
    <div className='flex flex-col gap-1 w-full'>
      {label && (
        <label className='text-sm font-medium text-foreground'>
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        rows={2}
        className={`bg-card py-2 px-3 rounded-xl text-md text-foreground border focus:outline-none focus:ring-[1px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${error ? 'border-destructive focus:ring-destructive' : 'focus:ring-ring focus:border-primary border-input'} ${className}`}
        {...props}
      />
      {error && (
        <span className='text-sm text-destructive'>
          {error}
        </span>
      )}
    </div>
  )
})

Textarea.displayName = 'Textarea'

export default Textarea
