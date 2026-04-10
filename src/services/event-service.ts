import { prisma } from "@/lib/prisma";
import type { CreateEventInput } from "@/features/events/schemas";

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
