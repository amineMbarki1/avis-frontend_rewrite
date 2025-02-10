import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Tooltip,
} from "@heroui/react";
import { EditIcon } from "./merchants-table";
import ClientForm from "./client-form";
import { useState } from "react";
import { useQueryClient } from "react-query";

export default function EditClient({ client }) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  return (
    <>
      <Tooltip>
        <Button
          size="lg"
          onPress={() => setOpen(true)}
          color="warning"
          variant="light"
        >
          <EditIcon />
        </Button>
      </Tooltip>
      <Modal isOpen={open} onOpenChange={setOpen}>
        <ModalContent>
          <ModalHeader>Modifier Client</ModalHeader>
          <ModalBody>
            <ClientForm
              onSuccess={() => {
                setOpen(false);
                queryClient.invalidateQueries("clients");
              }}
              mode="edit"
              defaultValues={client}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
