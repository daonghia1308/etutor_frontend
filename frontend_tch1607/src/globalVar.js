import socketIOClient from "socket.io-client";
import sailsIOClient from "sails.io.js";

export const io = sailsIOClient(socketIOClient)