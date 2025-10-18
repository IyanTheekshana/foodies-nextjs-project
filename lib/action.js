"use server";
import { revalidatePath } from "next/cache.js";
import { redirect } from "next/navigation";
import { addMeal } from "./meals.js";

export async function shareMeal(prevState, formData) {
  const mealData = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
    image: formData.get("image"),
  };

  if (
    mealData.title.trim().length === 0 ||
    mealData.summary.trim().length === 0 ||
    mealData.instructions.trim().length === 0 ||
    mealData.creator.trim().length === 0 ||
    mealData.creator_email.trim().length === 0 ||
    mealData.image.size === 0
  ) {
    //throw new Error("Invalid input - all fields are required.");
    return {
      message: "Invalid input - all fields are required.",
    };
  }

  await addMeal(mealData);
  revalidatePath("/meals");
  redirect("/meals");
}
