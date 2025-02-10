import { login } from "@/api/auth-api";
import PasswordInput from "@/components/password-input";
import {
  Image,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import logo from "../assets/logo.png";

import { z } from "zod";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthProvider";

const authSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(50, { message: "Password cannot exceed 50 characters" }),
});

type Auth = z.infer<typeof authSchema>;
export default function Login() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Auth>({ resolver: zodResolver(authSchema) });

  const { login: authenticate } = useAuth();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess(data) {
      toast.success("Authentifié avec succèes");
      authenticate({ token: data.token, user: data.user });
    },
  });

  return (
    <main className="w-[100vw] h-[100vh] min-h-[100vh] flex items-center justify-center">
      <div className="w-[480px]">
        <Card className="p-5">
          <CardHeader className="flex flex-col items-start">
            <Image src={logo} />
            <h1 className="text-3xl">Log in</h1>
          </CardHeader>
          <CardBody>
            <form
              onSubmit={handleSubmit((values) => mutation.mutate(values))}
              className="flex flex-col gap-4"
            >
              <Input
                errorMessage={errors.username?.message}
                isInvalid={!!errors?.username}
                {...register("username")}
                label={"Username or Email"}
              />
              <PasswordInput
                isInvalid={!!errors?.password}
                errorMessage={errors.password?.message}
                {...register("password")}
                label={"Password"}
              />

              {mutation.error?.response?.status === 401 && (
                <small className="text-danger">vérifier vos donnéés</small>
              )}
              <Button
                isLoading={mutation.isLoading}
                type="submit"
                size="lg"
                color="primary"
                variant="solid"
              >
                Continuer
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </main>
  );
}
