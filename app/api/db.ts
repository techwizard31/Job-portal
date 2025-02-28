import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const uri: any = process.env.NEXT_MONGO_URI;

const secret: any = process.env.NEXT_SECRET;

// Connect to MongoDB using mongoose
export async function connectToDatabase() {
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log("Connected to the database");
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
}

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  linkedin: {
    type: String,
    required: true,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

const companySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  info: {
    type: String,
  },
});

const Company =
  mongoose.models.Company || mongoose.model("Company", companySchema);

const jobSchema = new Schema(
  {
    companyname: {
      type: String,
      required: true,
    },
    company_id: {
      type: String,
      required: true,
    },
    jobcategory: {
      type: String,
      required: true,
    },
    jobtitle: {
      type: String,
      required: true,
    },
    jobdescription: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    lastdate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);


const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);

const applySchema = new Schema({
  companyname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true
  },
  company_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  job_id: {
    type: String,
    required: true,
  },
});

const Application =
  mongoose.models.Application || mongoose.model("Application", applySchema);

const createToken = (_id: string) => {
  return jwt.sign({ _id }, secret, { expiresIn: "2d" });
};

export { User, Company, Job, Application, createToken };
