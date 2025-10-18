"use client";

import { useFormStatus } from "react-dom";

export default function MealFormButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit">{pending ? "Submitting..." : "Share Meal"}</button>
  );
}
