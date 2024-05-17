const  API_URL  =  import.meta.env.VITE_BASE_URL as string
import axios from "axios";

const employeeAPI = {
  //creating the employee
  createEmployee: async (payload: any) => {
    try {
      const res = await axios.post(`${API_URL}/employee-create`, payload);
      return res;
    } catch (error) {
      throw error;
    }
  },

  //listing the employee by userId
  getEmployees: async (id: any) => {
    try {
      const res = await axios.get(`${API_URL}/employee-list/${id}`);
      return res;
    } catch (error) {
      throw error;
    }
  },
};

export default employeeAPI;
