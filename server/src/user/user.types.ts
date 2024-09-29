
export enum USER_ROLE {
  admin="ADMIN",
  user="USER",
}
export interface User {
    _id:string
    name: string;
    email: string;
    password: string;
    role:USER_ROLE
  }