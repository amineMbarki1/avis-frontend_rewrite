import {
  Button,
  ModalHeader,
  Tooltip,
  Modal,
  ModalBody,
  ModalContent,
} from "@heroui/react";
import { EditIcon } from "./merchants-table";
import MerchantForm from "./merchant-form";
import { useState } from "react";

export default function EditMerchant({ merchant }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Tooltip content="Edit user">
        <Button
          onPress={() => setOpen(true)}
          variant="light"
          className="text-lg text-default-400 cursor-pointer active:opacity-50"
        >
          <EditIcon />
        </Button>
      </Tooltip>
      <Modal isOpen={open} onOpenChange={setOpen}>
        <ModalContent>
          <ModalHeader>Modifier Commerçant</ModalHeader>
          <ModalBody>
            <MerchantForm defaultValues={merchant} mode="edit" />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
