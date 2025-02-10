import { useBusinesses } from "@/hooks/useBusinesses";

import {
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
  Tooltip,
  Link,
} from "@heroui/react";
import { useState } from "react";
import { useQueryClient } from "react-query";
import BusinessForm from "./business-form";
import { EyeIcon } from "./merchants-table";
import { Link as RouteLink } from "react-router-dom";
import EditBusiness from "./edit-business";
import DeleteBusiness from "./delete-business";

export default function BusinessTable({ filters }: { filters?: any }) {
  const { data, page, setPage, isFetching } = useBusinesses({
    initialFilters: filters,
  });

  const [openBusinessForm, setOpenBusinessForm] = useState(false);
  const queryClient = useQueryClient();

  return (
    <>
      <Modal isOpen={openBusinessForm} onOpenChange={setOpenBusinessForm}>
        <ModalContent>
          <ModalHeader>
            <h3>Ajouter Commerce</h3>
          </ModalHeader>
          <ModalBody>
            <BusinessForm
              defaultValues={{ merchant: filters?.merchant }}
              onSuccess={() => {
                queryClient.invalidateQueries("businesses");
                setOpenBusinessForm(false);
              }}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Card>
        <CardHeader>
          <h2 className="text-xl">Commerces</h2>
          <Button
            onPress={() => setOpenBusinessForm(true)}
            className="ml-auto"
            variant="bordered"
          >
            Ajouter
          </Button>
        </CardHeader>
        <CardBody>
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
                    onChange={(page) => setPage(page)}
                  />
                </div>
              ) : null
            }
          >
            <TableHeader>
              <TableColumn>Name</TableColumn>
              <TableColumn>#Clients</TableColumn>
              <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody
              emptyContent={"Empty :'("}
              loadingContent={<Spinner />}
              loadingState={isFetching ? "loading" : "idle"}
            >
              <>
                {data?.businesses.map(({ _id, name }) => (
                  <TableRow key={_id}>
                    <TableCell>{name}</TableCell>
                    <TableCell>
                      <Link>0</Link>
                    </TableCell>
                    <TableCell>
                      <Tooltip content="Détails">
                        <Button
                          as={RouteLink}
                          to={`/businesses/${_id}`}
                          size="lg"
                          variant="light"
                        >
                          <EyeIcon />
                        </Button>
                      </Tooltip>
                      <EditBusiness business={{ _id, name }} />
                      <DeleteBusiness id={_id} />
                    </TableCell>
                  </TableRow>
                ))}
              </>
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </>
  );
}
