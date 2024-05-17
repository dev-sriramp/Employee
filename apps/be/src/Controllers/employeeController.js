import Employee from '../Models/employeeModel'
import STATUS_CODE from '../const'
//Employee Creation
export async function createEmployee(req, res) {
    try {
        const employees = new Employee(req.body)
        let result = await employees.save()
        res.status(STATUS_CODE.success).json({
            data: result,
            message: "Employee created Successfully"
        })
    } catch (error) {
        console.log(error, "error");
        res.status(STATUS_CODE.internal_server_error).json({
            message: "Employee creation failed"
        })
    }
}

//Employee Listing
export async function getEmployeesByUserId(req, res) {
    try {
        const userId = req.params.id;
        const employees = await Employee.find({ userId: userId });
        if (!employees || employees.length === 0) {
            return res.status(STATUS_CODE.bad_request).json({ message: "Employees not found" });
        }
        res.status(STATUS_CODE.success).json({ data: employees, message: "Employees retrieved successfully" });
    } catch (error) {
        console.error(error);
        res.status(STATUS_CODE.internal_server_error).json({ message: "Internal server error" });
    }
}