import express from "express";

import createCustomer from "../controllers/customers/createCustomer.js";
import deleteCustomer from "../controllers/customers/deleteCustomer.js";
import getAllUserCustomers from "../controllers/customers/getAllUserCustomers.js";
import getSingleUserCustomer from "../controllers/customers/getSingleUserCustomer.js";
import updateCustomerInfo from "../controllers/customers/updateCustomerInfo.js";
import checkAuth from "../middleware/checkAuthMiddleware.js";

const Customer = express.Router();

// create a new customer at /api/v1/customer/create
Customer.route("/create").post(checkAuth, createCustomer);

// get all of a users customers at /api/v1/customer/all
Customer.route("/all").get(checkAuth, getAllUserCustomers);

// get, update and delete a customer
Customer
	.route("/:id")
	.get(checkAuth, getSingleUserCustomer)
	.patch(checkAuth, updateCustomerInfo)
	.delete(checkAuth, deleteCustomer);

export default router;