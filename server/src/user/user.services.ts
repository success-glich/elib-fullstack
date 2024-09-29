import UserModel from "./user.models";
import authHelper from "./user.helper";
import TokenHelper from "../helper/TokenHelper";
import { USER_ROLE } from "./user.types";
interface CreateUserOptions {
  name: string;
  email: string;
  password: string;
  role:string
}
class UserServices {
  constructor(private readonly userModel: typeof UserModel) {}
  async createUser({
    name,
    email,
    password,
    role=USER_ROLE.user
  }: CreateUserOptions):  Promise<{ registerUser: any; accessToken: string }> {

    try{


    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
      
    }
    const hashedPassword = await authHelper.hash(password);

    const newUser = new this.userModel({
        name,
        email,
        password: hashedPassword,
        role
    });
    
    await newUser.save();

    const registerUser =JSON.parse(JSON.stringify(newUser));
    delete registerUser.password;
    // * Token Generation

    const accessToken =await  TokenHelper.generateToken({sub:newUser._id});

    return {registerUser,accessToken};
  }catch(err){
    console.log("Error while register of user::",err);
    
    throw new Error(err as string);
  }

  }
  async loginUser(email: string, password: string)  {

   try {
     const user = await this.userModel.findOne({ email });
     if (!user) {
       throw new Error("Invalid email or password");
     }
     const isPasswordValid = await authHelper.compareHash(password,user.password)
     if (!isPasswordValid) {
       throw new Error("Invalid email or password");
     }
     const accessToken =await TokenHelper.generateToken({sub:user._id});

     const loggedInUser = JSON.parse(JSON.stringify(user));
     delete loggedInUser.password;

     return {accessToken,loggedInUser};
   } catch (err) {
    throw Error(err as string);
    
   }
  };
}
export default UserServices;
