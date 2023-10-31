"use client";
import { deletePet } from "@/app/actions";
import { useFormState, useFormStatus } from "react-dom";

const initialState = { message: null };
const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="bg-slate-400 ml-2 px-1 rounded"
      aria-disabled={pending}
    >
      Delete
    </button>
  );
};
export function DeleteForm({ name, owner }: { name: string; owner: string }) {
  const [state, formAction] = useFormState(deletePet, initialState);
  return (
    <form className="my-2" action={formAction} autoComplete="off">
      <input type="hidden" name="name" defaultValue={name} autoComplete="off" />
      <input
        type="hidden"
        name="owner"
        defaultValue={owner}
        autoComplete="off"
      />
      <SubmitButton />
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  );
}
