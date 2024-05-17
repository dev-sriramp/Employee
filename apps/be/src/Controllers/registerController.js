import Register from "../Models/registerModel";
import { hash } from "bcryptjs";
import STATUS_CODE from "../const";

// SignUp Function
export async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;
    const checkUser = await Register.findOne({ email });
    if (checkUser) {
      return res.status(STATUS_CODE.conflict).json({
        message: "Email Already exists",
      });
    }
    const hashedPassword = await hash(password, 10);
    const registerUser = new Register({
      name,
      email,
      password: hashedPassword,
    });
    await registerUser.save();
    res.status(STATUS_CODE.created).json({
      data: registerUser,
      message: "User Register Successfully"
    });
  } catch (error) {
    res.status(STATUS_CODE.bad_request).json({
      message: "Not registered",
    });
  }
}

