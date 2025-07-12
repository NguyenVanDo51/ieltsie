import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getRandomInt(min: number, max: number, except: number[] = []): number {
  let randomInt: number
  do {
    const array = new Uint32Array(1)
    crypto.getRandomValues(array)
    randomInt = (array[0] % (max - min + 1)) + min
  } while (except?.length < (max - min) && except.includes(randomInt))
  return randomInt
}