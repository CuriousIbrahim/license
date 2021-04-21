import { a1 } from "./A.ts";

export const b1 = () => {
  return a1;
};

export const b2 = () => {
  return b1();
};
