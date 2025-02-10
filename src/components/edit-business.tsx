import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Tooltip,
} from "@heroui/react";

import BusinessForm from "./business-form";
import { EditIcon } from "./merchants-table";
import { useState } from "react";
import { useQueryClient } from "react-query";

export default function EditBusiness({ business }) {
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
          <ModalHeader>
            <h2>Modifier commerce</h2>
          </ModalHeader>
          <ModalBody>
            <BusinessForm
              onSuccess={() => {
                queryClient.invalidateQueries("businesses");
                setOpen(false);
              }}
              defaultValues={business}
              mode="edit"
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
