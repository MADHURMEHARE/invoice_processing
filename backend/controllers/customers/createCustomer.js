import Customer from "../../models/customerModel.js";

const createCustomer = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);
    console.log("REQ USER:", req.user);

    const {
      name,
      email,
      phoneNumber,
      vatTinNo,
      address,
      city,
      country,
    } = req.body;

    // 🔥 HARD-CODE USER ID TEMPORARILY (CRITICAL)
    const userId = req.user?._id || "696cf092f8b93c4c366a14d0";

    const newCustomer = new Customer({
      createdBy: userId,
      name,
      email,
      phoneNumber,
      vatTinNo,
      address,
      city,
      country,
    });

    console.log("BEFORE SAVE");

    const savedCustomer = await newCustomer.save();

    console.log("AFTER SAVE:", savedCustomer);

    return res.status(201).json({
      success: true,
      customer: savedCustomer,
    });
  } catch (error) {
    console.error("SAVE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default createCustomer;
