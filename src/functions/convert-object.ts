import { z } from "zod";

export const toCamelCase = (str: string): string => {
  return str
    .replace(/([-_][a-z])/gi, (match) => match.toUpperCase().replace("-", "").replace("_", ""))
    .replace(/^[A-Z]/, (match) => match.toLowerCase());
};

export const convertStringToType = (value: string) => {
  if (value === "") {
    return value;
  }

  const stringToTypeSchema = z.union([
    z.literal("true").transform(() => true),
    z.literal("false").transform(() => false),
    z
      .string()
      .refine((value) => !isNaN(Number(value)), { message: "Not a valid number" })
      .transform((value) => Number(value)),
    z
      .string()
      .refine((value) => !isNaN(Date.parse(value)), { message: "Not a valid date" })
      .transform((value) => new Date(value)),
    z.string(),
  ]);

  const result = stringToTypeSchema.safeParse(value);
  if (result.success) {
    return result.data;
  }
  return value;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
type AnyObject = Record<string, any>;
export const convertObjectKeysToCamelCaseAndConvertStringValuesToType = <T extends AnyObject>(obj: AnyObject): T =>
  Object.entries(obj).reduce((acc, [key, value]) => {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      acc[toCamelCase(key) as keyof T] = convertObjectKeysToCamelCaseAndConvertStringValuesToType(value);
    } else {
      acc[toCamelCase(key) as keyof T] = convertStringToType(value) as any;
    }
    return acc;
  }, {} as T);
