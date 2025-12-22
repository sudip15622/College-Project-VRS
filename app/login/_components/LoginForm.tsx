"use client";
import { LoginSchema, LoginType } from "@/lib/schemas/login";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { LoginAction } from "@/lib/actions/auth";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
    reValidateMode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginType> = async(data) => {
      if(isSubmitting) return;
  
      try {
        const response = await LoginAction(data);
  
        if(response.success) {
          alert(response.message);
          reset();
          router.push("/");
          router.refresh();
        } else {
          alert(response.error);
        }
      } catch (error) {
        console.error(error);
        alert("Something went wrong!")
      }
    };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 w-full"
    >
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label="Email"
            type="email"
            placeholder="Enter your email"
            error={errors.email?.message}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label="Password"
            type="password"
            placeholder="Enter your password"
            error={errors.password?.message}
          />
        )}
      />

      <Button variant="primary" size="md" isLoading={isSubmitting} disabled={isSubmitting}>
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
