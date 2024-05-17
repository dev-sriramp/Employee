import { DatePicker } from "@/components/date-picker";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { DataTable } from "@/components/table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';


import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { EmployeeType } from "@/global";
import { PlusIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";

//Import Redux
import { useDispatch, useSelector } from "react-redux";
import { setEmployee } from "../redux/EmployeeReducer";
import { RootState } from "@/redux/store";

//Import Formik
import { useFormik } from "formik";
import * as yup from "yup";

//Import Services
import moment from "moment";
import employeeAPI from "@/service/service";
import Loading from "@/components/loader/loader";


const Dashboard = () => {
  const dispatch: any = useDispatch();
  const [openForm, setOpenForm] = useState(false);
  const [employeeList, setEmployeeList] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState(false);
  const { data }: any = useSelector((state: RootState) => state.employee);
  const { data: User }: any = useSelector((state: RootState) => state.user);

  //validation schema
  const validationSchema = yup.object({
    employeeName: yup.string().required("Name is required"),
    designation: yup.string().required("Designation is required"),
    department: yup.string().required("Department is required"),
    dateOfJoining: yup.string().required("Date of Joining is required"),
    address: yup.string().required("Address is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    //initial Values
    initialValues: {
      employeeName: "",
      designation: "",
      department: "",
      dateOfJoining: "",
      address: "",
    },
    validationSchema: validationSchema,
    //Submitting the form
    onSubmit: async (values) => {
      try {
        let payload: any = {
          ...values,
          uniqueId:uuidv4(),
          userId: User?._id,
        };
        if (!type) {
          dispatch(setEmployee(payload));
        } else {
          payload = {
            ...values,
            dateOfJoining: moment(values.dateOfJoining).format("DD-MM-YYYY"),
          };
          await employeeAPI.createEmployee(payload).then(async (res: any) => {
            console.log(res, "response");
            if (res?.data) {
              toast.success("Employee updated successfully");
              getEmployeesById();
            }
          });
        }
        setOpenForm(false);
      } catch (e) {
        console.log(e);
      }
      formik.resetForm();
    },
  });

  //list employees based on UserId
  const getEmployeesById = async () => {
    setLoading(true);
    try {
      await employeeAPI.getEmployees(User?._id).then((res: any) => {
        const uniqueVal: any = res?.data?.data.map(
          (item: any) => item?.uniqueId
        );
        setEmployeeList(uniqueVal);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  //initial listing
  useEffect(() => {
    if (data?.length !== 0) {
      getEmployeesById();
    }
  }, []);

  //Table Data initialization
  const EmployeeColumns: ColumnDef<EmployeeType>[] = [
    {
      accessorKey: "employeeName",
      header: "EmployeeName",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("employeeName")}</div>
      ),
    },
    {
      accessorKey: "designation",
      header: () => {
        return <p>Designation</p>;
      },
      cell: ({ row }) => <div className="">{row.getValue("designation")}</div>,
    },
    {
      accessorKey: "department",
      header: () => <div className="text-left">Department</div>,
      cell: ({ row }) => {
        return (
          <div className="text-left font-medium">
            {row.getValue("department")}
          </div>
        );
      },
    },
    {
      accessorKey: "dateOfJoining",
      header: () => <div className="text-left">Date of Joining</div>,
      cell: ({ row }) => {
        return (
          <div className="text-left">
            {new Date(row.getValue("dateOfJoining")).toLocaleDateString(
              "en-US",
              { month: "long", day: "numeric", year: "numeric" }
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "address",
      header: () => <div className="text-left">Address</div>,
      cell: ({ row }) => {
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="text-left truncate max-w-44">
                  {row.getValue("address")}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className=" max-w-sm">{row.getValue("address")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      },
    },
    {
      accessorKey: "actions",
      header: () => <div className="text-left">Actions</div>,
      cell: ({ row }: any) => {
        return (
          <Button
            variant="default"
            onClick={() => {
              setOpenForm(true);
              formik.setValues({
                ...row.original,
              });
              setType(true);
            }}
            disabled={employeeList?.includes(row?.original?.uniqueId)}
          >
            Update
          </Button>
        );
      },
    },
  ];

  //Close Model function
  const handleClose = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    formik.resetForm();
    setOpenForm(false);
    setType(false);
  };

  return (
    <div className="bg-sky-50 flex flex-col justify-between h-[100vh]">
      <Header />
      <div className=" container overflow-scroll flex-grow no-scrollbar">
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold text-teal-950">List Of Employees</p>
          <Dialog open={openForm}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setOpenForm(true);
                }}
                className="mt-4 gap-3 bg-teal-950 "
                variant={"default"}
              >
                <PlusIcon />
                Add Employee
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={formik.handleSubmit}>
                <div className="grid gap-4 py-4">
                  <p className="text-lg font-bold text-center">
                    {type ? "Update" : "Add"} Employee Detail's
                  </p>
                  <div className="items-center gap-4">
                    <p className="text-sm font-semibold pb-1">Name</p>
                    <Input
                      id="employeeName"
                      name="employeeName"
                      placeholder="Enter employee name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.employeeName}
                    />
                    {formik.touched.employeeName &&
                    formik.errors.employeeName ? (
                      <span className="text-red-500 text-sm">
                        {formik.errors.employeeName}
                      </span>
                    ) : null}
                  </div>
                  <div className="items-center gap-4">
                    <p className="text-sm font-semibold pb-1">Designation</p>
                    <Input
                      id="designation"
                      name="designation"
                      placeholder="Enter designation"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.designation}
                    />
                    {formik.touched.designation && formik.errors.designation ? (
                      <span className="text-red-500 text-sm">
                        {formik.errors.designation}
                      </span>
                    ) : null}
                  </div>
                  <div className="items-center gap-4">
                    <p className="text-sm font-semibold pb-1">Department</p>
                    <Input
                      id="department"
                      name="department"
                      placeholder="Enter department"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.department}
                    />
                    {formik.touched.department && formik.errors.department ? (
                      <span className="text-red-500 text-sm">
                        {formik.errors.department}
                      </span>
                    ) : null}
                  </div>
                  <div className="items-center gap-4">
                    <p className="text-sm font-semibold pb-1">
                      Date Of Joining
                    </p>
                    <DatePicker
                      date={formik.values.dateOfJoining}
                      setDate={(date: any) => {
                        formik.setFieldValue("dateOfJoining", date);
                      }}
                    />
                    {formik.touched.dateOfJoining &&
                    formik.errors.dateOfJoining ? (
                      <span className="text-red-500 text-sm">
                        {formik.errors.dateOfJoining}
                      </span>
                    ) : null}
                  </div>
                  <div className="items-center gap-4">
                    <p className="text-sm font-semibold pb-1">Address</p>
                    <Input
                      id="address"
                      name="address"
                      placeholder="Enter address"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.address}
                    />
                    {formik.touched.address && formik.errors.address ? (
                      <span className="text-red-500 text-sm">
                        {formik.errors.address}
                      </span>
                    ) : null}
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={(e)=>{
                    handleClose(e)
                  }} variant="ghost">
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-teal-950">
                    {" "}
                    {type ? "Update Employee" : "Create Employee"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        {!loading ? (
          <div>
            <DataTable data={data} columns={EmployeeColumns} />
          </div>
        ) : (
          <div className="h-full w-full flex justify-center items-center">
            <Loading />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
