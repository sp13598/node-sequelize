import express  from "express";
import userController from "../controllers/user.controller.js";
import { verifyAdmin, verifyOwner } from "../_middleware/verifyToken.js";
import hotelController from "../controllers/hotel.controller.js";
import categoryController from "../controllers/category.controller.js";
import foodController from "../controllers/food.controller.js";
import tableController from "../controllers/table.controller.js";

const router = express.Router();

// User Routes
router.route('/register-admin').post(userController.admin);
router.route('/register-owner').post(verifyAdmin, userController.owner);
router.route('/login').post(userController.login);
router.route('/user/:id')
.put(verifyOwner, userController.update)
.delete(verifyOwner, userController.remove);

// Hotel Routes
router.route('/hotel')
.post(verifyOwner, hotelController.save)
.get(verifyOwner, hotelController.getAll);

router.route('/hotel/:id')
.put(verifyOwner, hotelController.update)
.delete(verifyOwner, hotelController.remove);

// Category Routes
router.route('/category')
.post(verifyOwner, categoryController.save)

router.route('/category/:id')
.get(verifyOwner, categoryController.getAll)
.put(verifyOwner, categoryController.update)
.delete(verifyOwner, categoryController.remove);

// Food Routes
router.route('/food')
.post(verifyOwner, foodController.save)

router.route('/food/:id')
.get(verifyOwner, foodController.getAll)
.put(verifyOwner, foodController.update)
.delete(verifyOwner, foodController.remove);

// Tables Routes
router.route('/table')
.post(verifyOwner, tableController.save)

router.route('/table/:id')
.get(verifyOwner, tableController.getAll)
.delete(verifyOwner, tableController.remove);

export default router;