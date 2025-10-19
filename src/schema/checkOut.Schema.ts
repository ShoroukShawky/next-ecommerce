import { z } from "zod";

export const checkoutSchema = z.object({
  details: z.string().nonempty("this field is required").min(5, "Please enter at least 5 characters for details."),
  phone: z.string() .nonempty("this field is required").regex(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/,"Phone must be egypttion"),
  city: z .string().nonempty("this field is required").min(2, "City name must be at least 2 characters."),
});

export type CheckoutSchemaForm = z.infer<typeof checkoutSchema>;
