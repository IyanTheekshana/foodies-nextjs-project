import sql from "better-sqlite3";

const db = sql("meals.db");

export function getAllMeals() {
  //throw new Error("Function not implemented.");
  const stmt = db.prepare("SELECT * FROM meals");
  return stmt.all();
}

export function getMealBySlug(slug) {
  const stmt = db.prepare("SELECT * FROM meals WHERE slug = ?");
  return stmt.get(slug);
}

export function addMeal(mealData) {
  const stmt = db.prepare(`
    INSERT INTO meals (slug, title, image, summary, instructions, creator, creator_email)
    VALUES (@slug, @title, @image, @summary, @instructions, @creator, @creator_email)
  `);
  const info = stmt.run(mealData);
  return info.lastInsertRowid;
}
