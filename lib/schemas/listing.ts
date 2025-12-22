import { z } from "zod";

export const ListingSchema = z.object({
  type: z.enum(["Bike", "Scooter"]),
  name: z.string().min(1, "Name is required!"),
  description: z.string().optional(),
  pricePerDay: z.number().positive("Price per day must be positive!").min(100, "Price per day must be atleast 100!").max(10000, "Price per day cannot exceed 10K!"),
  location: z.string().min(1, "Location is required!"),
  image: z
    .instanceof(File, { message: "Please select a cover photo!" })
});

export type ListingType = z.infer<typeof ListingSchema>;
