import * as bcrypt from 'bcryptjs';
 
const SALT_ROUNDS = 10;

interface CompareHashResult {
  match: boolean; 
}

const  authHelper = {

    compareHash: async (plainText: string, hash: string): Promise<CompareHashResult> =>{
        try {
          const match = await bcrypt.compare(plainText, hash);
          return { match };
        } catch (error) {
          throw error; 
        }
      },
    hash: async (plainText: string): Promise<string> => {
        try {
          const salt = await bcrypt.genSalt(SALT_ROUNDS); // Use async/await for clarity
          const hashedPassword = await bcrypt.hash(plainText, salt);
          return hashedPassword;
        } catch (error) {
          throw error; 
        }
      }   

}
export default authHelper;