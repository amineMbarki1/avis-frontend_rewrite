import { Navbar } from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import SidebarProvider from "@/context/SidebarProvider";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SidebarProvider>
        <Navbar />
        <Sidebar />
      </SidebarProvider>
      <main className="p-4 mt-10  sm:ml-64">
        <div className="max-w-[1300px] mx-auto"> {children}</div>
      </main>
    </>
  );
}
