import { Button, Modal, ModalBody, ModalContent, Tooltip } from "@heroui/react";
import { DeleteIcon } from "./merchants-table";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { deleteClient } from "@/api/client-api";
import { toast } from "react-toastify";

export default function DeleteClient({ id }) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteClient,
    onSuccess() {
      toast.success("Supprimé avec succèes");
      queryClient.invalidateQueries("clients");
    },
    onError() {
      toast.error("Une erreur est survnue");
    },
  });
  return (
    <>
      <Tooltip>
        <Button
          size="lg"
          onPress={() => setOpen(true)}
          color="danger"
          variant="light"
        >
          <DeleteIcon />
        </Button>
      </Tooltip>
      <Modal isOpen={open} onOpenChange={setOpen}>
        <ModalContent>
          <ModalBody>
            sutre ??
            <Button
              isLoading={mutation.isLoading}
              onPress={() => mutation.mutate(id)}
            >
              Confirmer
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
