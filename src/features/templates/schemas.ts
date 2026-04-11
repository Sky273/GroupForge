import { z } from "zod";

export const slotTypeSchema = z.enum(["person", "group", "mixed"]);

export const templateSlotSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().optional(),
  x: z.number().min(0).max(100),
  y: z.number().min(0).max(100),
  type: slotTypeSchema,
  capacity: z.number().int().positive().optional(),
});

export const createTemplateSchema = z.object({
  title: z.string().min(2).max(120),
  subtitle: z.string().max(160).optional().or(z.literal("")),
  description: z.string().max(1200).optional().or(z.literal("")),
  canvasWidth: z.number().int().min(320).max(4000),
  canvasHeight: z.number().int().min(320).max(4000),
  slots: z.array(templateSlotSchema).default([]),
});

export const updateTemplateSchema = createTemplateSchema.partial();

export type CreateTemplateInput = z.infer<typeof createTemplateSchema>;
export type UpdateTemplateInput = z.infer<typeof updateTemplateSchema>;
export type TemplateSlotInput = z.infer<typeof templateSlotSchema>;
