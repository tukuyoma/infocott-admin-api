import express from 'express';
import { ObjectID } from 'mongodb';
import connectToDatabase from '../../config/db';
import { errorMessages } from '../../constants/error-messages';
import adminActionsLogger from '../../utils/actions-logger';
import checkAuthToken from '../../utils/check-auth-token';
import checkPermission from '../../utils/check-permission';
import checkValidAdmin from '../../utils/check-valid-admin';

const router = express.Router();
router.get(
  '/profile/:email',
  checkAuthToken,
  checkValidAdmin,
  checkPermission('accounts', 'canGetAdmin'),
  async (req, res) => {
    const { adminId: actionAdminId, adminEmail: actionAdminEmail } = req;
    const { email } = req.params;
    const { db } = await connectToDatabase();

    //check if admin to get exist
    const admin = await db.collection('admin').findOne({ email });
    if (!admin) {
      return res.status(404).json({
        msg: errorMessages.admin.notFound,
      });
    }

    //get admin
    await db
      .collection('admin')
      .findOne({ _id: new ObjectID(adminToGetId) }, async (err, data) => {
        if (err) {
          return res.status(500).json({
            msg: errorMessages.database.serverError,
          });
        }
        //log admin activity
        await adminActionsLogger({
          type: 'get',
          date: Date.now(),
          creator: actionAdminEmail,
          isSuccess: true,
          log: `${actionAdminEmail} viewed ${admin.email} admin account`,
        });
        return res.status(201).json({ data });
      });
  }
);

export default router;
