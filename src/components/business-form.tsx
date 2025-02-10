import { Button, Input } from "@heroui/react";
import SelectMerchant from "./select-merchant-input";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { createBusiness, updateBusiness } from "@/api/business-api";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthProvider";

export default function BusinessForm({
  defaultValues,
  onSuccess,
  mode = "create",
}) {
  const auth = useAuth();
  const props = useForm({ defaultValues });

  const createBusinessMutation = useMutation({
    mutationFn: createBusiness,
    onSuccess() {
      toast.success("Créès avec succès");
      if (onSuccess) onSuccess();
    },

    onError() {
      toast.error("Une erreur est survenue");
    },
  });
  const updateBusinessMutation = useMutation({
    mutationFn: updateBusiness,
    onSuccess() {
      toast.success("Modifié avec succès");
      if (onSuccess) onSuccess();
    },

    onError() {
      toast.error("Une erreur est survenue");
    },
  });

  return (
    <FormProvider {...props}>
      <form
        onSubmit={props.handleSubmit((values) =>
          mode === "create"
            ? createBusinessMutation.mutate(values)
            : updateBusinessMutation.mutate({
                business: values,
                id: defaultValues._id,
              })
        )}
        className="flex flex-col gap-4"
      >
        {!defaultValues?.merchant &&
          mode === "create" &&
          auth.user.role !== "merchant" && <SelectMerchant />}
        <Input
          {...props.register("name")}
          label={"Nom du commerce"}
          type="text"
        />
        <Button type="submit">Confirmer</Button>
      </form>
    </FormProvider>
  );
}
