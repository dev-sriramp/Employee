import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const employeeSchema = new Schema(
    {
        employeeName: String,
        designation: String,
        department: String,
        dateOfJoining: String,
        address: String,
        userId: String,
        uniqueId: String,
        isActive: { type: Boolean, default: true },
        createdAt: { type: Number, default: Date.now() },
        updatedAt: { type: Number, default: Date.now() },
    },
    { versionKey: false }
);
const Employee = model('Employee', employeeSchema);

export default Employee;
