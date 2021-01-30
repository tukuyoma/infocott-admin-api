import express from 'express';
import connectToDatabase from '../../config/db';
import { ObjectID } from 'mongodb';

const router = express.Router();
router.get('/get-home-post', async (req, res) => {
  const homePageId = process.env.HOME_PAGE_SETTINGS_DB_ID;

  const { db } = await connectToDatabase();

  const homePageSettings = await db
    .collection('homePage')
    .findOne({ _id: new ObjectID(homePageId) }, { projection: { _id: 0 } });

  const sections = homePageSettings.sections;

  const sectionOne = await db
    .collection('posts')
    .find({ category: `${sections.one}` })
    .toArray();

  const sectionTwo = await db
    .collection('posts')
    .find({ category: `${sections.two}` })
    .toArray();

  const sectionThree = await db
    .collection('posts')
    .find({ category: `${sections.three}` })
    .toArray();

  const sectionFour = await db
    .collection('posts')
    .find({ category: `${sections.four}` })
    .toArray();

  const sectionFive = await db
    .collection('posts')
    .find({ category: `${sections.five}` })
    .toArray();

  const sectionSix = await db
    .collection('posts')
    .find({ category: `${sections.six}` })
    .toArray();

  const sectionSeven = await db
    .collection('posts')
    .find({ category: `${sections.seven}` })
    .toArray();

  res.status(200).json({
    alerts: homePageSettings.alerts,
    hero: homePageSettings.hero,
    sectionOne: { category: sections.one, posts: sectionOne },
    sectionTwo: { category: sections.two, posts: sectionTwo },
    sectionThree: { category: sections.three, posts: sectionThree },
    sectionFour: { category: sections.four, posts: sectionFour },
    sectionFive: { category: sections.five, posts: sectionFive },
    sectionSix: { category: sections.six, posts: sectionSix },
    sectionSeven: { category: sections.seven, posts: sectionSeven },
  });
});

export default router;
