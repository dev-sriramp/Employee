import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";


interface employeeType {
  data: any[] | null;
  loading: boolean;
  error: string | null;
}

//Define the initial state
const initialState: employeeType = {
  data: [],
  loading: false,
  error: null,
};

//Fetch the employee Details

//Define the types
export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    clearEmployeeData: (state) => {
      state.data = [];
    },
    setEmployee: (state, action) => {
      state.data = state.data
        ? [...state.data, action.payload]
        : [action.payload];

      console.log(action?.payload);
    },
  },
});

export const employeeData = (state: RootState) => state.employee.data;

export default employeeSlice.reducer;

export const { clearEmployeeData, setEmployee } = employeeSlice.actions;
