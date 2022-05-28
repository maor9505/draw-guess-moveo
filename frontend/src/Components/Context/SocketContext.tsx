import React, { createContext, useState, ReactNode, useEffect } from "react";
import { io, Socket } from "socket.io-client";

const socket = io("http://localhost:3000", {
  transports: ["websocket"],
});

export const SocketContext = createContext({
  socket: socket,
});

const SocketProvider = ({ children }: { children: ReactNode }) => {
 


  return (
    <SocketContext.Provider
      value={{
        socket
      }}
    >
      {children}
    </SocketContext.Provider>
  );
 };

export default SocketProvider;
