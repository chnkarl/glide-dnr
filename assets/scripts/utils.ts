import { customAlphabet } from 'nanoid'
import { v4 as uuidv4 } from 'uuid';

export function Wait(delay = 1000) {
  return new Promise((resolve: any) => {
    setTimeout(() => {
      resolve()
    }, delay)
  })
}

/**
 * 判断对象是否有属性
 * 
 * @param obj 对象
 * @param property 属性名
 * @returns 
 */
export const HasOwn = (obj: any, property: string): boolean => {

  // 非对象类型
  if (typeof obj !== 'object') return false

  // null 或 数组
  if (obj === null || Array.isArray(obj)) return false

  return Object.prototype.hasOwnProperty.call(obj, property)
}

export const GenerateRandomString = (mode = "default", length = 21): string => {

  let alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_"

  switch (mode) {

    case "number":
      alphabet = "0123456789"
      break;

    case "lowerCase":
      alphabet = "abcdefghijklmnopqrstuvwxyz"
      break;

    case "upperCase":
      alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
      break;

    case "letters":
      alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
      break;

    case "numberLowerCase":
      alphabet = "0123456789abcdefghijklmnopqrstuvwxyz"
      break;

    case "numberUpperCase":
      alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
      break;

  }

  // 第一位只能是小写字母
  const prefix = customAlphabet("abcdefghijklmnopqrstuvwxyz", 1)()

  const body = customAlphabet(alphabet, length - 1)()

  return prefix + body
}

export const GenerateUid = () => {
  const uuidStr = uuidv4()
  return "_" + uuidStr.replace(/-/g, "")
}
