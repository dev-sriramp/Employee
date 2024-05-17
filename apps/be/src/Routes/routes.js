import { Router as _Router } from "express";
const Router = _Router();
import { registerUser } from "../Controllers/registerController";
import { createEmployee, getEmployeesByUserId } from "../Controllers/employeeController";

//register routes
Router.route("/register").post(registerUser);

//employee routes
Router.route("/employee-create").post(createEmployee);
Router.route("/employee-list/:id").get(getEmployeesByUserId);



export default Router;
