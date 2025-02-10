import { useForm } from "react-hook-form";
import { Button, Input } from "@heroui/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

import PasswordInput from "./password-input";

import { createMerchant, updateMerchant } from "@/api/merchant-api";

export const merchantSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters long")
    .max(50, "First name must be less than 50 characters")
    .nonempty("First name is required"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters long")
    .max(50, "Last name must be less than 50 characters")
    .nonempty("Last name is required"),
  googleReviewLink: z
    .string()
    .url("Invalid URL for Google Review Link")
    .nonempty("Google Review Link is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(64, "Password must be less than 64 characters")
    .nonempty("Password is required"),
  phone: z
    .string()
    .regex(/^\d+$/, "Phone must contain only numbers")
    .min(6, "Phone must be at least 6 digits long")
    .max(15, "Phone must be less than 15 digits"),
});

export type Merchant = z.infer<typeof merchantSchema>;

export default function MerchantForm({
  formId,
  onSuccess,
  defaultValues,
  mode = "create",
}: {
  formId?: any;
  onSuccess?: any;
  defaultValues?: any;
  mode?: "edit" | "create";
}) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Merchant>({
    defaultValues,
    resolver: zodResolver(
      mode === "create"
        ? merchantSchema
        : merchantSchema.extend({
            password: z
              .string()
              .min(8, "Password must be at least 8 characters long")
              .max(64, "Password must be less than 64 characters")
              .or(z.literal(""))
              .transform((value) => (value.trim() === "" ? undefined : value))
              .optional(),
          })
    ),
  });

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createMerchant,

    onSuccess() {
      queryClient.invalidateQueries("merchants");
      toast.success("Commerçant ajouté avec succès");
      onSuccess && onSuccess();
    },
    onError() {
      toast.error("Une erreur est survenue");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateMerchant,

    onSuccess() {
      queryClient.invalidateQueries("merchants");
      toast.success("Commerçant modifié avec succès");
      onSuccess && onSuccess();
    },
    onError() {
      toast.error("Une erreur est survenue");
    },
  });

  return (
    <form
      className="flex flex-col gap-4"
      id={formId}
      onSubmit={handleSubmit((values) =>
        mode === "create"
          ? createMutation.mutate(values)
          : updateMutation.mutate({ id: defaultValues?._id, merchant: values })
      )}
    >
      <div className="flex items-center gap-2">
        <Input {...register("firstName")} label="Prénom" type="text" />
        <Input {...register("lastName")} label="Nom" type="text" />
      </div>

      <Input {...register("phone")} label="Tel" type="tel" />
      <Input {...register("email")} label="Email" type="email" />

      <PasswordInput
        {...register("password")}
        label="Mot de passe"
        type="password"
      />

      <Input
        {...register("googleReviewLink")}
        type="url"
        label="Lien Google Review"
      />

      <Button
        isLoading={createMutation.isLoading}
        className="my-2"
        type="submit"
      >
        Confirmer
      </Button>
    </form>
  );
}
