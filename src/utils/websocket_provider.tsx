"use client";

import React, { useState, createContext, useContext } from "react";
import { usePathname } from "next/navigation";

type Conn = WebSocket | null;

export const WebsocketContext = createContext<{
  conn: Conn;
  setConn: (c: Conn) => void;
}>({
  conn: null,
  setConn: () => {},
});

const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [conn, setConn] = useState<Conn>(null);
  const pathname = usePathname();
  const path = pathname.split("/home").slice(-1)[0];
  const regex = /\/chat\/*/;

  if (!regex.test(path)) {
    // console.log("inside path", path);
    // console.log("inside regex", regex.test(path));
    // console.log("inside conn", conn);
    if (conn !== null) {
      // console.log("CLOSED");
      conn.close();
      setConn(null);
    }
    // console.log("NOTHING HAPPENEDD");
  }

  // console.log("TEST PASS", path);
  // console.log("TEST PASS conn", conn);

  return (
    <WebsocketContext.Provider
      value={{
        conn: conn,
        setConn: setConn,
      }}
    >
      {children}
    </WebsocketContext.Provider>
  );
};

export const useWS = () => {
  return useContext(WebsocketContext);
};

export default WebSocketProvider;
