import { z } from "zod";


export const ListingSchema = z.object({
  type: z.enum(["Bike", "Scooter"], "Please select the vehicle type!"),
  name: z.string().min(1, "Please provide vehicle name!"),
  description: z.string().min(100, "Description must have atleast 100 characters!").max(2000, "Description cannot exceed 2000 characters!"),
  pricePerDay: z
    .number({ error: "Please set the price per day!" })
    .int("Price must be an integer!")
    .min(100, "Price must be at least 100!")
    .max(50000, "Price cannot exceed 50,000!"),
  location: z.string().min(1, "Please enter the pickup location!"),
  image: z
    .instanceof(File, { error: "Please select a cover photo!" })
    .refine(
      (file) => file && file.type.startsWith("image/"),
      { message: "File must be an image!" }
    )
    .refine(
      (file) => file && file.size < 5 * 1024 * 1024,
      { message: "Image size must be below 5MB!" }
    ),
});

export type ListingType = z.infer<typeof ListingSchema>;
