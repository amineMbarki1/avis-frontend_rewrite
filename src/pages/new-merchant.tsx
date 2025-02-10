import MerchantForm from "@/components/merchant-form";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
import { useNavigate } from "react-router-dom";

export default function NewMerchant() {
  const navigate = useNavigate();
  return (
    <Modal isOpen onClose={() => navigate(-1)}>
      <ModalContent>
        <ModalHeader>Ajouter Commerçant</ModalHeader>
        <ModalBody>
          <MerchantForm
            mode="create"
            onSuccess={() => navigate(-1)}
            formId="new_merchant"
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
1;
