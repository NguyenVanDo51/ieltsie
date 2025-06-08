import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getRandomInt(min: number, max: number, except: number[] = []): number {
  let randomInt: number
  do {
    randomInt = Math.floor(Math.random() * (max - min + 1)) + min
  } while (except.includes(randomInt))
  return randomInt
}
