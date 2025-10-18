import { getAllMeals } from "@/lib/meals";
import Link from "next/link";
import { Suspense } from "react";
import MealsGrid from "../components/meals/meals-grid";
import classes from "./page.module.css";

function Meals() {
  const meals = getAllMeals();
  return <MealsGrid meals={meals}></MealsGrid>;
}

export default function MealsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created
          <span className={classes.highlight}> by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share your favorite Recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={<p>Loading meals...</p>}>
          <Meals></Meals>
        </Suspense>
      </main>
    </>
  );
}
