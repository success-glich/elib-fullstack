import UserModel from "./user.models";
import UserService from "./user.services";

const userServices = new UserService(UserModel);

export default userServices;