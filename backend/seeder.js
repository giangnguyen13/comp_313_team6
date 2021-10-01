import dotenv from "dotenv";
import connectDB from "./config/db.js";

// import sample data
import users from "./data/users.js";
import products from "./data/products.js";
import staffs from "./data/staffs.js";
import productAttributes from "./data/productAttributes.js";

// import Model
import User from "./models/user.model.js";
import Product from "./models/product.model.js";
import Staff from "./models/staff.model.js";
import ProductAttribute from "./models/productAttribute.model.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Staff.deleteMany({});
    await Product.deleteMany({});
    await User.deleteMany({});
    await ProductAttribute.deleteMany({});

    await User.insertMany(users);

    const staffUser = await Staff.insertMany(staffs);
    const creatorId = staffUser[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, updatedBy: creatorId };
    });

    await Product.insertMany(sampleProducts);
    await ProductAttribute.insertMany(productAttributes);

    console.log("Data imported");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Staff.deleteMany({});
    await Product.deleteMany({});
    await User.deleteMany({});
    await ProductAttribute.deleteMany({});

    console.log("Data destroyed");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === "--d") {
  destroyData();
} else {
  importData();
}
