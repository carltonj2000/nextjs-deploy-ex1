"use client";
import { createPet } from "@/app/actions";
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
      Add
    </button>
  );
};
export function AddForm() {
  const [state, formAction] = useFormState(createPet, initialState);
  return (
    <form className="my-2" action={formAction} autoComplete="on">
      <label htmlFor="name">Enter Pet</label>
      <input
        type="text"
        id="name"
        name="name"
        className="border border-cyan-500"
        required
        autoComplete="additional-name"
      />
      <label htmlFor="owner">Enter Owner</label>
      <input
        type="text"
        id="owner"
        name="owner"
        className="border border-cyan-500"
        required
        autoComplete="name"
      />
      <SubmitButton />
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  );
}
