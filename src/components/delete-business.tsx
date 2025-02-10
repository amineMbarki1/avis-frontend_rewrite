import { Button, Modal, ModalBody, ModalContent, Tooltip } from "@heroui/react";
import { DeleteIcon } from "./merchants-table";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { deleteBusiness } from "@/api/business-api";
import { toast } from "react-toastify";

export default function DeleteBusiness({ id }) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteBusiness,
    onSuccess() {
      queryClient.invalidateQueries("clients");
      queryClient.invalidateQueries("businesses");
      toast.success("succés");
    },

    onError() {
      toast.error("une erreur est survenue");
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
      <Modal onOpenChange={setOpen} isOpen={open}>
        <ModalContent>
          <ModalBody>
            Sure supprimer ?
            <Button
              isLoading={mutation.isLoading}
              onPress={() => mutation.mutate(id)}
              color="danger"
            >
              Confirmer
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
