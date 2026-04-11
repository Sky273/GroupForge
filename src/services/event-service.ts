import { prisma } from "@/lib/prisma";
import type { CreateEventInput, UpdateEventInput } from "@/features/events/schemas";

export async function listEvents() {
  return prisma.event.findMany({
    include: {
      groups: true,
    },
    orderBy: [{ eventDate: "asc" }],
  });
}

export async function getEventById(id: string) {
  return prisma.event.findUnique({
    where: { id },
    include: {
      groups: {
        include: {
          slots: {
            include: {
              assignments: {
                include: {
                  person: true,
                },
              },
            },
          },
        },
      },
    },
  });
}

export async function updateEvent(id: string, input: UpdateEventInput) {
  return prisma.event.update({
    where: { id },
    data: {
      title: input.title,
      subtitle: input.subtitle === "" ? null : input.subtitle,
      description: input.description === "" ? null : input.description,
      eventDate: input.eventDate ? new Date(input.eventDate) : undefined,
      startTime: input.startTime === "" ? null : input.startTime,
      endTime: input.endTime === "" ? null : input.endTime,
      location: input.location === "" ? null : input.location,
      timezone: input.timezone === "" ? null : input.timezone,
      status: input.status,
    },
  });
}

export async function createEvent(input: CreateEventInput) {
  return prisma.event.create({
    data: {
      title: input.title,
      subtitle: input.subtitle || null,
      description: input.description || null,
      eventDate: new Date(input.eventDate),
      startTime: input.startTime || null,
      endTime: input.endTime || null,
      location: input.location || null,
      timezone: "Europe/Paris",
    },
  });
}
