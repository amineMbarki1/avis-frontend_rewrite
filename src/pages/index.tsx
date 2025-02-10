import DefaultLayout from "@/layouts/default";
import { Outlet } from "react-router-dom";

//Root Page
export default function IndexPage() {
  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  );
}
