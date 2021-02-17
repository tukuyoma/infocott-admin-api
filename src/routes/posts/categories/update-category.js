import express from 'express';
import connectToDatabase from '../../../config/db';
import { ObjectID } from 'mongodb';
import adminActionsLogger from '../../../utils/actions-logger';
import { errorMessages } from '../../../constants/error-messages';
import checkAuthToken from '../../../utils/check-auth-token';
import checkValidAdmin from '../../../utils/check-valid-admin';
import checkPermission from '../../../utils/check-permission';

const router = express.Router();

router.put(
  '/:categoryTitle',
  checkAuthToken,
  checkValidAdmin,
  checkPermission({ service: 'posts', permit: 'canUpdateCategory' }),
  async (req, res) => {
    const { categoryTitle } = req.params;
    const { adminEmail: actionAdminEmail } = req;
    const { title, description } = req.body;
    if (!categoryTitle) {
      return res.status(422).json({ msg: errorMessages.category.catRequired });
    }
    if (!title) {
      return res
        .status(422)
        .json({ msg: errorMessages.category.titleRequired });
    }
    if (!description) {
      return res
        .status(422)
        .json({ msg: errorMessages.category.decriptionRequired });
    }

    const { db } = await connectToDatabase();

    const category = await db
      .collection('categories')
      .findOne({ title: categoryTitle });

    if (!category) {
      return res.status(404).json({ msg: errorMessages.category.notFound });
    }

    const updateCategory = {
      createdBy: actionAdminEmail,
      title: title.toLowerCase(),
      description,
      timestamp: Date.now(),
    };

    await db.collection('categories').updateOne(
      { title: categoryTitle },
      {
        $set: {
          ...updateCategory,
        },
      },
      async (err, data) => {
        if (err) {
          return res
            .status(500)
            .json({ msg: errorMessages.database.serverError });
        }
        await adminActionsLogger({
          type: 'update',
          date: Date.now(),
          creator: actionAdminEmail,
          isSuccess: true,
          log: `${actionAdminEmail} updated ${title} category details`,
        });
        return res.status(200).json(`${title} category updated successfully`);
      }
    );
  }
);

export default router;
