import { UserModel } from "./user.model";

export class AuthModel {
  token: string;
  status: string;
  message: string;
  data:any
  setAuth(auth: AuthModel) {
    this.token = auth.token;
    this.status = auth.status;
    this.message = auth.message;
    this.data = auth.data
  }
}
