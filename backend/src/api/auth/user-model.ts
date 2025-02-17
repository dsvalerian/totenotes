import * as mongoose from "mongoose";
import {ObjectId} from "mongoose";

export interface UserModel {
  email: string,
  password: string,
  _id: ObjectId
}

const userSchema = new mongoose.Schema<UserModel>({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});

const User = mongoose.model<UserModel>("User", userSchema);
export default User;