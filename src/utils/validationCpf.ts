const CPF_BLOCKLIST: Array<string> = [
  "00000000000",
  "11111111111",
  "22222222222",
  "33333333333",
  "44444444444",
  "55555555555",
  "66666666666",
  "77777777777",
  "88888888888",
  "99999999999",
  "12345678909",
];

const STRICT_STRIP_REGEX: RegExp = /[.-]/g;
const LOOSE_STRIP_REGEX: RegExp = /[^\d]/g;

const strip = (number: string, strict?: boolean): string => {
  const regex: RegExp = strict ? STRICT_STRIP_REGEX : LOOSE_STRIP_REGEX;
  return (number || "").replace(regex, "");
};

const verifierDigit = (digits: string): number => {
  const numbers: Array<number> = digits.split("").map((number) => {
    return parseInt(number, 10);
  });

  const modulus: number = numbers.length + 1;
  const multiplied: Array<number> = numbers.map(
    (number, index) => number * (modulus - index),
  );
  const mod: number =
    multiplied.reduce((buffer, number) => buffer + number) % 11;

  return mod < 2 ? 0 : 11 - mod;
};

export const isValidCPF = (number: string, strict?: boolean): boolean => {
  const stripped: string = strip(number, strict);

  if (!stripped) return false;
  if (stripped.length !== 11) return false;
  if (CPF_BLOCKLIST.includes(stripped)) return false;

  let numbers: string = stripped.substring(0, 9);
  numbers += verifierDigit(numbers);
  numbers += verifierDigit(numbers);

  return numbers.substring(-2) === stripped.substring(-2);
};
