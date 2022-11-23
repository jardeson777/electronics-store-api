export const cleaningCpf = (cpf: string) => {
  return cpf.replace(/\./g, "").replace("-", "");
};
