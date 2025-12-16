import Company from "../models/company.model.js";
import cloudinary from "../utils/cloudinary.js"; 


const uploadToCloudinary = (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    stream.end(fileBuffer);
  });
};

class CompanyController {

  // Register a new company
  static async register(req, res) {
    try {
      const {
        companyName,
        email,
        companyType,
        gstNumber,
        typeOfStaffing,
        panNumber,
        phoneNo,
        numberOfEmployees,
        address1,
        address2,
        city,
        state
      } = req.body;

      let logoUrl = "";

      // Upload logo if file exists
      if (req.file) {
        logoUrl = await uploadToCloudinary(req.file.buffer, "company_logos");
      }

      const company = new Company({
        companyName,
        email,
        companyType,
        gstNumber,
        typeOfStaffing,
        panNumber,
        phoneNo,
        numberOfEmployees,
        address1,
        address2,
        city,
        state,
        logo: logoUrl
      });

      await company.save();

      res.status(201).json({
        message: "Company registered successfully",
        company
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

   // Get all companies
  static async getAll(req, res) {
    try {
      const companies = await Company.find();
      res.status(200).json({ companies });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  // Update a company
  static async update(req, res) {
    try {
      const { id } = req.params;
      const updateData = { ...req.body };

      // If a new logo is uploaded
      if (req.file) {
        const logoUrl = await uploadToCloudinary(req.file.buffer, "company_logos");
        updateData.logo = logoUrl;
      }

      const updatedCompany = await Company.findByIdAndUpdate(id, updateData, { new: true });

      if (!updatedCompany) {
        return res.status(404).json({ message: "Company not found" });
      }

      res.status(200).json({ message: "Company updated successfully", company: updatedCompany });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  // Delete a company
  static async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedCompany = await Company.findByIdAndDelete(id);

      if (!deletedCompany) {
        return res.status(404).json({ message: "Company not found" });
      }

      res.status(200).json({ message: "Company deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
}




export default CompanyController ;