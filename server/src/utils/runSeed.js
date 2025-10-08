// server/src/utils/runSeed.js
const { connectDB, getDB, closeDB } = require('../config/database');
const { seedProducts } = require('./seedData');

const runSeed = async () => {
  try {
    await connectDB();
    const db = getDB();

    await db.collection('products').deleteMany({});
    console.log('Products collection cleared');

    await seedProducts();
    console.log('Seeding finished');

    await closeDB();
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed', err);
    process.exit(1);
  }
};

runSeed();
