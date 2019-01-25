import io from "socket.io-client";
import { updateCurrentUsers } from "../actions/usersActions";

const socket = io();

socket.on("connect", socket => {
  console.log("connected via socket:", socket);
});

socket.on("welcome", data => {
  console.log("welsome data:", data);
});

socket.on("currentUsers", users => {
  console.log(users, "USERHSLRJSLMRL!!!");
  // debugger;
  updateCurrentUsers(users);
});
socket.on("disconnect", _ => {
  updateCurrentUsers([]);
});

export default socket;
