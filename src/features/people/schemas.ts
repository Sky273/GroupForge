import { z } from "zod";

export const createPersonSchema = z.object({
  firstName: z.string().min(1).max(80),
  lastName: z.string().min(1).max(80),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().max(40).optional().or(z.literal("")),
  notes: z.string().max(1200).optional().or(z.literal("")),
});

export const updatePersonSchema = createPersonSchema.partial().extend({
  status: z.enum(["active", "inactive", "archived"]).optional(),
});

export type CreatePersonInput = z.infer<typeof createPersonSchema>;
export type UpdatePersonInput = z.infer<typeof updatePersonSchema>;
