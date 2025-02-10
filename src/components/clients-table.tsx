import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import ClientForm from "./client-form";
import { useState } from "react";
import { useClients } from "@/hooks/useClients";
import { useQueryClient } from "react-query";

import EditClient from "./edit-client";
import DeleteClient from "./delete-client";
import ClientPreferences from "./client-prefrences";

export default function ClientsTable({ filters }: { filters?: any }) {
  const [openClientForm, setOpenClientForm] = useState(false);

  const { data, isFetching, error, page, setPage } = useClients({
    initialFilters: filters,
  });

  const queryClient = useQueryClient();

  return (
    <>
      <Card>
        <CardHeader className="justify-between">
          <h2 className="text-2xl">Clients</h2>
          <Button onPress={() => setOpenClientForm(true)} variant="bordered">
            Ajouter
          </Button>
        </CardHeader>
        <CardBody className="px-3">
          <Table
            bottomContent={
              data?.totalPages > 0 ? (
                <div className="flex w-full justify-center">
                  <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={data?.totalPages}
                    onChange={setPage}
                  />
                </div>
              ) : null
            }
          >
            <TableHeader>
              <TableColumn>Nom</TableColumn>
              <TableColumn>Email</TableColumn>
              <TableColumn>Tel</TableColumn>
              <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody
              emptyContent={"Empty :'("}
              loadingContent={<Spinner />}
              loadingState={isFetching ? "loading" : "idle"}
            >
              {data &&
                data.clients.map((client) => {
                  return (
                    <TableRow key={client._id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar size="sm" name={client.firstName} />
                          {client.firstName} {client.lastName}
                        </div>
                      </TableCell>
                      <TableCell>{client.email}</TableCell>
                      <TableCell>{client.phone}</TableCell>
                      <TableCell>
                        <EditClient client={client} />
                        <DeleteClient id={client._id} />
                        <ClientPreferences client={client} />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      <Modal isOpen={openClientForm} onOpenChange={setOpenClientForm}>
        <ModalContent>
          <ModalHeader>Ajouter Client</ModalHeader>
          <ModalBody>
            <ClientForm
              onSuccess={() => {
                queryClient.invalidateQueries("clients");
                setOpenClientForm(false);
              }}
              defaultValues={filters}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
