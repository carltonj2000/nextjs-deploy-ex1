"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  owner: z.string().min(1),
});

export async function createPet(prevState: any, formData: FormData) {
  const data = schema.parse({
    name: formData.get("name"),
    owner: formData.get("owner"),
  });
  try {
    await sql`INSERT INTO pets (name, owner) VALUES (${data.name}, ${data.owner})`;
    revalidatePath("/");
    return { message: `Added pet ${data.name} with owner ${data.owner}.` };
  } catch (e) {
    return { messge: "Failed to create pet" };
  }
}

export async function deletePet(prevState: any, formData: FormData) {
  const data = schema.parse({
    name: formData.get("name"),
    owner: formData.get("owner"),
  });
  try {
    await sql`DELETE FROM pets WHERE name = ${data.name} AND owner = ${data.owner};`;
    revalidatePath("/");
    return { message: `Deleted pet ${data.name} with owner ${data.owner}.` };
  } catch (e) {
    console.log({ e });
    return { message: "Failed to delete pet" };
  }
}
