const { sql } = require('@vercel/postgres');
const { users, weights } = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedUsers() {
  try {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await sql`
      CREATE TABLE IF NOT EXISTS wm_users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
		    height NUMERIC NULL,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "wm-users" table`);

    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return sql`
        INSERT INTO wm_users (id, name, email, height, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${user.height}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
      })
    );

    console.log(`Seeded ${insertedUsers.length} wm-users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedWeights() {
  try {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await sql`
      CREATE TABLE IF NOT EXISTS wm_weights (
        user_id UUID NOT NULL,
        weight NUMERIC NOT NULL,
        date DATE NOT NULL,
		PRIMARY KEY(user_id, date)
      );
    `;

    console.log(`Created "wm-weights" table`);

    const insertedWeights = await Promise.all(
      weights.map(
        (weight) => sql`
        INSERT INTO wm_weights (user_id, weight, date)
        VALUES (${weight.userId}, ${weight.weight}, ${weight.date})
      `
      )
    );

    console.log(`Seeded ${insertedWeights.length} weights`);

    return {
      createTable,
      weights: insertedWeights,
    };
  } catch (error) {
    console.error('Error seeding weights:', error);
    throw error;
  }
}

(async () => {
  await seedUsers();
  await seedWeights();
})();
