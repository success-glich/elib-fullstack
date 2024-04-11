import createHttpError from "http-errors";
import UserModel from "./user.models";
import bcrypt from "bcryptjs";
import authHelper from "./user.helper";
import TokenHelper from "../helper/TokenHelper";
interface CreateUserOptions {
  name: string;
  email: string;
  password: string;
}
class UserServices {
  constructor(private readonly userModel: typeof UserModel) {}
  async createUser({
    name,
    email,
    password,
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
    });
    
    await newUser.save();

    const registerUser =JSON.parse(JSON.stringify(newUser));
    delete registerUser.password;
    // * Token Generation

    const accessToken =await  TokenHelper.generateToken({sub:newUser._id});

    return {registerUser,accessToken};
  }catch(err){
    console.log("Error while register of user",err);
    throw new Error("An error occurred while creating user.");
  }

  }
}
export default UserServices;
