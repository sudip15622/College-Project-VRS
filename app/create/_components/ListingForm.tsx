"use client";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { ListingSchema, ListingType } from "@/lib/schemas/listing";

const ListingForm = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ListingType>({
    resolver: zodResolver(ListingSchema),
    mode: "onChange",
    reValidateMode: "onSubmit",
    defaultValues: {
      type: undefined,
      name: "",
      description: "",
      pricePerDay: undefined,
      location: "",
      image: undefined,
    },
  });

  return (
    <form className="space-y-8 pt-16 w-full mx-auto px-14 pb-10 overflow-y-scroll h-[calc(100vh-80px)] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <h2 className="text-2xl mb-6 underline">
        Provide basic information
      </h2>
      <div className="absolute bg-card border-t-2 border-border bottom-0 w-full left-1/2 -translate-x-1/2 flex flex-row items-center justify-between h-30 px-14">
        <Button
          type="button"
          variant="outline"
          disabled={isSubmitting}
          className=""
        >
          Cancel
        </Button>

        <Button
          variant="primary"
          size="md"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Create listing
        </Button>
      </div>
    </form>
  );
};

export default ListingForm;
