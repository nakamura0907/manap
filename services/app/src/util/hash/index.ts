import bcrypt from "bcrypt";

export const hashSync = (data: string | Buffer) => {
  return bcrypt.hashSync(data, 10);
};

export const compareSync = (data: string | Buffer, encrypted: string) => {
  return bcrypt.compareSync(data, encrypted);
};
