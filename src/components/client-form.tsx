import { Button, Input } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import SelectBusiness from "./select-business-input";
import SelectMerchant from "./select-merchant-input";
import { useMutation } from "react-query";
import { createClient, updateClient } from "@/api/client-api";
import { toast } from "react-toastify";
import { useState } from "react";
import { useAuth } from "@/context/AuthProvider";

const clientSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  business: z.string().min(1, { message: "Business ID is required" }), // Assuming ObjectId is represented as a string
});

type Client = z.infer<typeof clientSchema>;

export default function ClientForm({
  defaultValues,
  onSuccess,
  mode = "create",
}: {
  defaultValues?: any;
  onSuccess?: any;
  mode?: "create" | "edit" | "create-schedule";
}) {
  const auth = useAuth();
  const [selectedMerchant, setSelectedMerchant] = useState(null);
  const formProps = useForm<Client>({
    defaultValues,
    resolver: zodResolver(
      mode === "create"
        ? clientSchema
        : clientSchema.partial({ business: true })
    ),
  });

  const createClientMutation = useMutation({
    mutationFn: createClient,
    onSuccess() {
      toast.success("Créer avec succés");
      if (onSuccess) onSuccess();
    },
    onError() {
      toast.error("Une erreur est survenue");
    },
  });

  const updateClientMutation = useMutation({
    mutationFn: updateClient,
    onSuccess() {
      toast.success("Modifier avec succés");
      if (onSuccess) onSuccess();
    },
    onError() {
      toast.error("Une erreur est survenue");
    },
  });

  return (
    <FormProvider {...formProps}>
      <form
        onSubmit={formProps.handleSubmit((values) =>
          mode === "create"
            ? createClientMutation.mutate({ client: values, params: undefined })
            : updateClientMutation.mutate({
                id: defaultValues._id,
                client: values,
              })
        )}
        className="flex flex-col gap-4"
      >
        {!defaultValues?.merchant &&
          !defaultValues?.business &&
          mode === "create" &&
          auth.user?.role !== "merchant" && (
            <SelectMerchant onSelectionChange={setSelectedMerchant} />
          )}
        {!defaultValues?.business && mode === "create" && (
          <SelectBusiness
            initialFilters={{
              merchant: defaultValues?.merchant || selectedMerchant,
            }}
          />
        )}
        <div className="flex gap-2">
          <Input label="Prénom" {...formProps.register("firstName")} />
          <Input label="Nom" {...formProps.register("lastName")} />
        </div>
        <Input label="Email" type="email" {...formProps.register("email")} />
        <Input label="Tel" type="tel" {...formProps.register("phone")} />
        <Button isLoading={createClientMutation.isLoading} type="submit">
          Confirmer
        </Button>
        <Button
          onPress={() => {
            if (Object.keys(formProps.formState.errors).length !== 0) return;

            createClientMutation.mutate({
              client: formProps.getValues(),
              params: { scheduleSMS: true, scheduleEmail: true },
            });
          }}
        >
          Confirmer et planifier
        </Button>
      </form>
    </FormProvider>
  );
}
