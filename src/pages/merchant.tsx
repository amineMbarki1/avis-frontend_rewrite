import { updateMerchant } from "@/api/merchant-api";
import BusinessTable from "@/components/business-table";
import ClientsTable from "@/components/clients-table";
import LoadingOverlay from "@/components/LoadingOverlay";
import TemplateEditor from "@/components/template-editor";
import { useMerchant } from "@/hooks/useMerchant";
import { Avatar, Card, CardBody, CardHeader, Link } from "@heroui/react";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function Merchant() {
  const { id } = useParams();

  const { isFetching, data, error } = useMerchant(id);

  const [currentLoading, setCurrentLoading] = useState<"sms" | "email" | null>(
    null
  );

  const updateMutation = useMutation({
    mutationFn: updateMerchant,
    onSuccess() {
      toast.success("Template modifié avec succés");
    },
    onError() {
      toast.error("Une erreur est survenue");
    },

    onSettled() {
      setCurrentLoading(null);
    },
  });
  const queryClient = useQueryClient();

  return (
    <>
      <LoadingOverlay isLoading={isFetching}>
        <Card>
          <CardHeader>
            <h1 className="text-xl">Détails</h1>
          </CardHeader>
          <CardBody>
            {data && (
              <>
                <div className="flex gap-2 items-center">
                  <Avatar />
                  <span>
                    {data.firstName} {data.lastName}
                  </span>
                </div>
                <p>{data.email}</p>
                <p>{data.phone}</p>
                <Link href={data.googleReviewLink}>
                  {data.googleReviewLink}
                </Link>
              </>
            )}
          </CardBody>
        </Card>
      </LoadingOverlay>
      <br />
      <BusinessTable filters={{ merchant: id }} />
      <br />
      <ClientsTable filters={{ merchant: id }} />
      <br />
      <Card>
        <CardHeader>
          <h2 className="text-2xl ">Templates</h2>
        </CardHeader>
        <CardBody>
          <div className="flex gap-2 mb-2">
            <h3 className="text-xl ">SMS</h3>
          </div>
          {data && (
            <TemplateEditor
              isLoading={currentLoading === "sms"}
              content={data?.smsTemplate || ""}
              onSave={(editor) => {
                setCurrentLoading("sms");
                updateMutation.mutate({
                  id,
                  merchant: { smsTemplate: editor.getText() },
                });
                queryClient.invalidateQueries("merchants");
              }}
            />
          )}

          <div className="flex gap-2 my-5">
            <h3 className="text-xl ">Email</h3>
          </div>

          {data && (
            <TemplateEditor
              isLoading={currentLoading === "email"}
              content={data?.emailTemplate || ""}
              onSave={(editor) => {
                setCurrentLoading("email");
                queryClient.invalidateQueries("merchants");
                updateMutation.mutate({
                  id,
                  merchant: { emailTemplate: editor.getText() },
                });
              }}
            />
          )}
        </CardBody>
      </Card>
    </>
  );
}
