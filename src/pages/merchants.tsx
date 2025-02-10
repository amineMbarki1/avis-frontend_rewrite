import { Card, CardHeader, CardBody, CardFooter, Button } from "@heroui/react";
import MerchantsTable from "@/components/merchants-table";
import { Link, Outlet } from "react-router-dom";

export default function Merchants() {
  return (
    <>
      <MerchantsTable />
      <Outlet />
    </>
  );
}
