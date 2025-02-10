/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

import {
  Divider,
  Image,
  Spacer,
  Listbox,
  ListboxItem,
  Tab,
  Tabs,
  Button,
} from "@heroui/react";
import { useAuth } from "@/context/AuthProvider";
import { useSidebar } from "@/context/SidebarProvider";

export default function Sidebar() {
  const auth = useAuth();
  const adminLinks = (
    <>
      <Tab title="Dashboard" as={Link} to="/"></Tab>

      <Tab
        as={Link}
        title=" Commerçant"
        className="flex items-center  p-2  text-lg"
        to={"/merchants"}
      />

      <Tab as={Link} title="Commerces" to={"/businesses"}></Tab>

      <Tab title={"Clients"} to="/clients" as={Link}></Tab>
      <Tab as={Link} to="/review-schedule" title="Planification des avis"></Tab>
    </>
  );

  const merchantLinks = (
    <>
      <Tab title="Dashboard" to={"/"} as={Link}></Tab>
      <Tab title="Commerces" as={Link} to={"/businesses"} />
      <Tab title="Clients" as={Link} to={"/clients"}></Tab>
      <Tab title=" Planifications des avis" as={Link} to="/review-schedule" />
      <Tab title={"Avis"} as={Link} to="/google-reviews" />
    </>
  );

  const { setOpen, open } = useSidebar();
  return (
    <>
      {open && (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <div
          onClick={() => setOpen(false)}
          className="left-0 top-0 fixed w-[100vw]  h-[100vh] z-40 bg-[rgba(0,0,0,0.25)]"
        >
          <Button
            onPress={() => setOpen(false)}
            className="absolute right-0"
            variant="bordered"
          >
            <svg
              className="fill-gray-700"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
            </svg>
          </Button>
        </div>
      )}
      <div
        className={`bg-white px-2 fixed top-0 left-0 z-50 w-64 h-screen transition-transform   ${open ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0 `}
      >
        <div className="px-3  ">
          <Image src={logo} alt="logo" />
          <Spacer y={5} />
          <Divider />
          <Spacer y={5} />
        </div>
        <Tabs fullWidth size="lg" isVertical aria-label="Actions">
          {auth?.user?.role?.includes("admin") && adminLinks}
          {auth?.user?.role === "merchant" && merchantLinks}
        </Tabs>
      </div>
    </>
  );
}
