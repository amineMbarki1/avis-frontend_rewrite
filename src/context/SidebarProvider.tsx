import { createContext, useContext, useState } from "react";

const SidebarContext = createContext<any>({ open: false, setOpen() {} });

export function useSidebar() {
  return useContext(SidebarContext);
}

export default function SidebarProvider({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}
