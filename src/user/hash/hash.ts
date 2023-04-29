import * as bcrytp from 'bcrypt';

export const generateHash = async (password: string) => {
  const saltOrRound = 10;
  const hash = await bcrytp.hash(password, saltOrRound);

  return hash;
};

export const verifyHash = async (password: string, hash: string) => {
  return await bcrytp.compare(password, hash);
};
