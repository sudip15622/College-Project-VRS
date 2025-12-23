"use client";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { ListingSchema, ListingType } from "@/lib/schemas/listing";
import { RiMotorbikeFill, RiEBikeFill } from "react-icons/ri";
import { DiVim } from "react-icons/di";
import Textarea from "@/components/ui/Textarea";
import { useState } from "react";
import { FaCamera, FaUpload, FaTimes } from "react-icons/fa";
import Image from "next/image";

const ListingForm = () => {
  const router = useRouter();
  const [preview, setPreview] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
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

  const onSubmit: SubmitHandler<ListingType> = async (data) => {
    console.log(data);
  };

  const handleFileUpload = async (
    input: FileList | React.ChangeEvent<HTMLInputElement>
  ) => {
    let file: File | undefined;

    if (input instanceof FileList) {
      file = input[0];
    } else {
      file = input.target.files?.[0];
    }

    if (!file || !file.type.startsWith("image/")) return;

    // Generate preview URL
    const url = URL.createObjectURL(file);
    setValue("image", file, { shouldValidate: true });
    setPreview(url);
  };

  const handleFileRemove = () => {
    setValue("image", null as unknown as File, { shouldValidate: true });
    setPreview("");
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 pt-16 w-full mx-auto px-14 pb-30 overflow-y-scroll h-[calc(100vh-80px)] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
    >
      <h2 className="text-2xl mb-6 underline">Provide basic information</h2>

      <Controller
        name="type"
        control={control}
        render={({ field }) => (
          <div className="flex flex-col gap-1 w-full">
            <label
              htmlFor="type"
              className="text-sm font-medium text-foreground"
            >
              Choose vehicle type
            </label>
            <div className="grid grid-cols-2 gap-y-5 gap-x-10">
              <div
                onClick={() => field.onChange("Bike")}
                className={`p-2 flex border border-border rounded-2xl gap-x-5 items-center hover:shadow-sm transition-all duration-200 ease-in-out cursor-pointer ${
                  field.value === "Bike"
                    ? "bg-border text-primary shadow-sm"
                    : "hover:bg-background"
                }`}
              >
                <div className="text-3xl bg-background p-2 rounded-lg flex items-center justify-center">
                  <RiMotorbikeFill />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-lg font-semibold">Bike</h3>
                  <p className="text-sm text-muted-foreground">
                    Motorcycles, sport bikes, cruisers
                  </p>
                </div>
              </div>
              <div
                onClick={() => field.onChange("Scooter")}
                className={`p-2 flex border border-border rounded-2xl gap-x-5 items-center hover:shadow-sm transition-all duration-200 ease-in-out cursor-pointer ${
                  field.value === "Scooter"
                    ? "bg-border text-primary shadow-sm"
                    : "hover:bg-background"
                }`}
              >
                <div className="text-3xl bg-background p-2 rounded-lg flex items-center justify-center">
                  <RiEBikeFill />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-lg font-semibold">Scooter</h3>
                  <p className="text-sm text-muted-foreground">
                    Automatic scooters, mopeds
                  </p>
                </div>
              </div>
            </div>
            {errors.type?.message && (
              <span className="text-sm text-destructive">
                {errors.type?.message}
              </span>
            )}
          </div>
        )}
      />

      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label="Brand/Model & Year"
            placeholder="e.g., Honda Dio 2022"
            error={errors.name?.message}
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <Textarea
            {...field}
            label="Description"
            placeholder="Describe your vehicle providing mileage, engine capacity, fueltype, and additional features that your vehicle have."
            error={errors.description?.message}
          />
        )}
      />

      <h2 className="text-2xl mb-6 underline">Set Pricing & location</h2>
      <Controller
        name="pricePerDay"
        control={control}
        render={({ field }) => (
          <Input
            type="number"
            placeholder="e.g., 1000"
            label="Price Per Day (NPR)"
            value={field.value?.toString() || ""}
            onChange={(e) => {
              const value = e.target.value;
              field.onChange(value ? parseInt(value, 10) : undefined);
            }}
            error={errors.pricePerDay?.message}
          />
        )}
      />

      <Controller
        name="location"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label="Pickup location"
            placeholder="e.g., Pragati Marga, Katarchwok, Bharatpur, Chitwan"
            error={errors.location?.message}
            message="Use this format: street, area, city, district"
          />
        )}
      />
      <Controller
        name="location"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label="Pickup location"
            placeholder="e.g., Pragati Marga, Katarchwok, Bharatpur, Chitwan"
            error={errors.location?.message}
            message="Use this format: street, area, city, district"
          />
        )}
      />

      <h2 className="text-2xl mb-6 underline">Upload cover photo</h2>
      <Controller
        name="location"
        control={control}
        render={({ field }) => (
          <div className="space-y-4">
            {/* Upload Area */}
            {!getValues("image") && !preview ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`w-full h-80 border-2 flex flex-col items-center gap-4 border-dashed border-border hover:border-primary/50 rounded-lg p-8 text-center transition-colors ${
                  isDragging && "border-primary bg-background"
                }`}
              >
                <div
                  className={`p-4 text-4xl text-primary bg-background rounded-full flex items-center justify-center transition-colors ${
                    isDragging && "bg-primary/20"
                  }`}
                >
                  <FaUpload />
                </div>
                <div className="flex flex-col items-center gap-2 mt-2">
                  <p className="text-lg font-semibold mb-1">
                    Drag & drop your best vehicle photo here
                  </p>
                  <p className="text-muted-foreground mb-2 text-sm">
                    This will be the main image renters see first
                  </p>
                  <label className="flex items-center gap-2 px-4 py-2 bg-primary/20 border rounded-lg cursor-pointer hover:bg-primary/30 transition-colors font-medium text-primary">
                    <FaCamera />
                    Choose photo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e)}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            ) : (
              /* Preview Cover Image */
              <div className="relative overflow-hidden">
                <div className="relative overflow-hidden w-full h-80 rounded-xl">
                  <Image
                    src={preview}
                    alt="Cover photo"
                    className="object-cover"
                    fill
                    sizes="400px"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEwIiBoZWlnaHQ9IjE5MiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjEwIiBoZWlnaHQ9IjE5MiIgZmlsbD0iI2UwZTBlMCIvPjwvc3ZnPg=="
                    loading="lazy"
                    // priority
                  />
                </div>
                <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-md">
                  Cover Photo
                </div>
                <button
                  type="button"
                  className="absolute top-2 right-2 h-6 w-6 rounded-full bg-destructive hover:bg-destructive/90 flex items-center justify-center text-card cursor-pointer"
                  onClick={() => handleFileRemove()}
                >
                  <FaTimes />
                </button>
              </div>
            )}
          </div>
        )}
      />

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
          type="submit"
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
