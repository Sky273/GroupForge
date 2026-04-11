import { prisma } from "@/lib/prisma";
import type { CreatePersonInput, UpdatePersonInput } from "@/features/people/schemas";

export async function listPeople() {
  return prisma.person.findMany({
    orderBy: [{ createdAt: "desc" }],
  });
}

export async function getPersonById(id: string) {
  return prisma.person.findUnique({
    where: { id },
  });
}

export async function createPerson(input: CreatePersonInput) {
  return prisma.person.create({
    data: {
      firstName: input.firstName,
      lastName: input.lastName,
      fullName: `${input.firstName} ${input.lastName}`.trim(),
      email: input.email || null,
      phone: input.phone || null,
      notes: input.notes || null,
    },
  });
}

export async function updatePerson(id: string, input: UpdatePersonInput) {
  return prisma.person.update({
    where: { id },
    data: {
      firstName: input.firstName,
      lastName: input.lastName,
      fullName: input.firstName && input.lastName ? `${input.firstName} ${input.lastName}`.trim() : undefined,
      email: input.email === "" ? null : input.email,
      phone: input.phone === "" ? null : input.phone,
      notes: input.notes === "" ? null : input.notes,
      status: input.status,
    },
  });
}

export async function archivePerson(id: string) {
  return prisma.person.update({
    where: { id },
    data: { status: "archived" },
  });
}
