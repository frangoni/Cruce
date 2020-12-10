import { combineReducers } from "redux";
import user from "./user";
import users from "./users";
import animations from "./animations";
import orders from "./orders"
import cadeterias from "./cadeterias"


export default combineReducers({
  user,
  users,
  animations,
  orders,
  cadeterias
});
