// TODO : Create a script to seed categories

import { db } from '@/db';
import { categories } from '@/db/schema';

const categoryNames = [
  "Cars and Vehicles",
  "Music",
  "Gaming",
  "Technology",
  "Travel",
  "Food and Cooking",
  "Health and Fitness",
  "Education",
  "Fashion and Beauty",
  "Sports",
  "Entertainment",
  "News and Politics",
  "Science and Nature",
  "Art and Design",
  "DIY and Crafts",
  "Home and Garden",
  "Business and Finance",
  "Lifestyle",
  "Pets and Animals",
  "Parenting and Family"
]

async function main() {
  console.log('Seeding categories...');

  try {
    const values = categoryNames.map(name => ({
      name,
      description: `Videos related to ${name.toLowerCase()}`,
    }));

    await db.insert(categories).values(values);

    console.log('Categories seeded successfully!');
  }
  catch (error) {
    console.error('Error seeding categories: ', error);
    process.exit(1);
  }
}

main();