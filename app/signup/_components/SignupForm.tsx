"use client";
import { SignupSchema, SignupType } from "@/lib/schemas/signup";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { signupAction } from "@/lib/actions/auth";
import { useRouter } from "next/navigation";

const SignupForm = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignupType>({
    resolver: zodResolver(SignupSchema),
    mode: "onChange",
    reValidateMode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<SignupType> = async(data) => {
    if(isSubmitting) return;

    try {
      const response = await signupAction(data);

      if(response.success) {
        alert(response.message);
        reset();
        router.push("/login");
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
        name="name"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label="Full Name"
            placeholder="Enter your name"
            error={errors.name?.message}
          />
        )}
      />

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
            placeholder="Create your password"
            error={errors.password?.message}
          />
        )}
      />

      <Button variant="primary" size="md" isLoading={isSubmitting} disabled={isSubmitting}>
        Create Account
      </Button>
    </form>
  );
};

export default SignupForm;
