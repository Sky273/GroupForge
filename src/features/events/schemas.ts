import { z } from "zod";

export const createEventSchema = z.object({
  title: z.string().min(2).max(120),
  subtitle: z.string().max(180).optional().or(z.literal("")),
  description: z.string().max(1500).optional().or(z.literal("")),
  eventDate: z.string().min(1),
  startTime: z.string().optional().or(z.literal("")),
  endTime: z.string().optional().or(z.literal("")),
  location: z.string().max(160).optional().or(z.literal("")),
});

export const updateEventSchema = createEventSchema.partial().extend({
  status: z.enum(["draft", "planned", "ongoing", "completed", "archived"]).optional(),
  timezone: z.string().max(80).optional().or(z.literal("")),
});

export type CreateEventInput = z.infer<typeof createEventSchema>;
export type UpdateEventInput = z.infer<typeof updateEventSchema>;
