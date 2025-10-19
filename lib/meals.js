import sql from "better-sqlite3";
import fs from "fs";
import slugify from "slugify";
import xss from "xss";

import path from "path";
const db = sql(path.join(process.cwd(), "meals.db"));

export function getAllMeals() {
  //throw new Error("Function not implemented.");
  const stmt = db.prepare("SELECT * FROM meals");
  return stmt.all();
}

export function getMealBySlug(slug) {
  const stmt = db.prepare("SELECT * FROM meals WHERE slug = ?");
  return stmt.get(slug);
}

export async function addMeal(mealData) {
  const slug = slugify(mealData.title, { lower: true, strict: true });
  const instructionsClean = xss(mealData.instructions);

  mealData.slug = slug;
  mealData.instructions = instructionsClean;

  // mealData.image is a File object
  const extension = mealData.image.name.split(".").pop();
  const fileName = `${slug}-${Date.now()}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await mealData.image.arrayBuffer();
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) throw new Error("Error writing image file!");
  });

  mealData.image = `/images/${fileName}`;

  const stmt = db.prepare(`
    INSERT INTO meals (slug, title, image, summary, instructions, creator, creator_email)
    VALUES (@slug, @title, @image, @summary, @instructions, @creator, @creator_email)
  `);

  return stmt.run(mealData).lastInsertRowid;
}
