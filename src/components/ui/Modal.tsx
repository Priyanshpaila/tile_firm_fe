import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from './Button';
import { IoClose } from 'react-icons/io5';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className={cn(
          "bg-background w-full max-w-lg rounded-lg shadow-lg border border-border p-6 animate-in zoom-in-95 duration-200 relative",
          className
        )}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold font-heading">{title}</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 rounded-full">
            <IoClose className="h-5 w-5" />
          </Button>
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}
