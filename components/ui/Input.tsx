"use client"
import React, { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ 
  label, 
  error, 
  className = "",
  type = "text",
  ...props 
}, ref) => {
  return (
    <div className='flex flex-col gap-1 w-full'>
      {label && (
        <label className='text-sm font-medium text-foreground'>
          {label}
        </label>
      )}
      <input 
        ref={ref}
        type={type}
        className={`bg-card py-2 px-3 truncate rounded-xl text-md text-foreground border  focus:outline-none focus:ring-[1px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${error ? 'border-destructive focus:ring-destructive' : 'focus:ring-ring focus:border-primary border-input'} ${className}`}
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

Input.displayName = 'Input'

export default Input
