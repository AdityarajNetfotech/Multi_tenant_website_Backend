import mongoose from "mongoose";
import User from "../tenant/models/User.js";
import Company from "../tenant/models/Company.js";

const createTenantDB = async (company) => {
  const tenantDBUri = `${process.env.MONGO_BASE_URL}/${company.dbName}`;

  const tenantConnection = await mongoose.createConnection(tenantDBUri);

  console.log(`✅ Tenant DB connected: ${company.dbName}`);

  // Register models on tenant DB
  const TenantUser = tenantConnection.model("User", User.schema);
  const TenantCompany = tenantConnection.model("Company", Company.schema);

  // Create company inside tenant DB
  const tenantCompany = await TenantCompany.create({
    _id: company._id,
    companyName: company.companyName,
    email: company.email,
  });

  // Create default Admin user
  await TenantUser.create({
    name: "Admin",
    email: company.email,
    password: "Admin@123", // send email to reset
    role: "Admin",
    company: tenantCompany._id,
  });

  console.log("✅ Tenant initialized");
};

export default createTenantDB;
