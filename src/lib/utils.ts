import { clsx, type ClassValue } from 'clsx';
// Typically we use tailwind-merge here too, but clsx works for basic combining.

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
