import { AddForm } from "@/app/add-form";
import { DeleteForm } from "@/app/delete-form";
import { sql } from "@vercel/postgres";

export default async function Cart({
  params,
}: {
  params: { user: string };
}): Promise<JSX.Element> {
  const { rows } = await sql`SELECT * from PETS`;
  return (
    <div>
      <AddForm />
      <h1 className="text-xl font-bold mb-2 mt-3">Pets</h1>
      {rows.map(({ name, owner }, id) => (
        <div key={id} className="flex items-center">
          {name} - {owner} <DeleteForm name={name} owner={owner} />
        </div>
      ))}
    </div>
  );
}
