import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";

// $-title   Delete User Account
// $-path    DELETE /api/v1/user/:id
// $-auth    Private/Admin
// an admin user can delete any other user account
const deleteUserAccount = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);
  
	if (user) {
	  const result = await User.deleteOne({ _id: req.params.id });
  
	  if (result.deletedCount === 1) {
		res.json({
		  success: true,
		  message: `User ${user.firstName} deleted successfully`,
		});
	  } else {
		res.status(404);
		throw new Error("User not found");
	  }
	} else {
	  res.status(404);
	  throw new Error("User not found");
	}
  });
  

export default deleteUserAccount;