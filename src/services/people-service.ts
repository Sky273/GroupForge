import { prisma } from "@/lib/prisma";
import type { CreatePersonInput } from "@/features/people/schemas";

export async function listPeople() {
  return prisma.person.findMany({
    orderBy: [{ createdAt: "desc" }],
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

export async function archivePerson(id: string) {
  return prisma.person.update({
    where: { id },
    data: { status: "archived" },
  });
}
