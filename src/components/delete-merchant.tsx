import { deleteMerchant } from "@/api/merchant-api";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { DeleteIcon } from "./merchants-table";
import { Button, Modal, ModalBody, ModalContent, Tooltip } from "@heroui/react";
import { toast } from "react-toastify";

export default function DeleteMerchant({ id }) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteMerchant,
    onSuccess() {
      toast.success("Supprimé avec succès");
      queryClient.invalidateQueries("clients");
      queryClient.invalidateQueries("merchants");
      queryClient.invalidateQueries("businesses");
      setOpen(false);
    },
  });

  return (
    <>
      <Tooltip color="danger" content="Delete user">
        <Button
          size="sm"
          variant="light"
          onPress={() => setOpen(true)}
          className="text-lg text-danger cursor-pointer active:opacity-50"
        >
          <DeleteIcon />
        </Button>
      </Tooltip>
      <Modal isOpen={open} onOpenChange={setOpen}>
        <ModalContent>
          <ModalBody>
            <p>
              Êtes-vous sûr de vouloir supprimer ce commerçant ? Cette action
              est irréversible et entraînera également la suppression de toutes
              les ressources associées
            </p>
            <Button color="danger" onPress={() => mutation.mutate(id)}>
              Supprimer ?
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
