import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

//Import  Redux
import { clearEmployeeData } from "@/redux/EmployeeReducer";
import { clearUserData } from "@/redux/userReducer";
import { RootState } from "@/redux/store";

const Header = () => {
  const dispatch: any = useDispatch();
  const { data }: any = useSelector((state: RootState) => state.user);

  return (
    <header className="bg-teal-950	 text-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <p className="text-lg font-bold">Employee Management</p>
        </div>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className=" hover:bg-teal-950	 select-none"
              >
                <img
                  alt="Avatar"
                  className="rounded-full"
                  height="32"
                  src="https://getdrawings.com/free-icon/cool-avatar-icons-72.png"
                  style={{
                    aspectRatio: "32/32",
                    objectFit: "cover",
                  }}
                  width="32"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{data?.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  dispatch(clearUserData());
                  dispatch(clearEmployeeData());
                }}
                className=" bg-teal-950	 hover:bg-red-600 hover:cursor-pointer text-white"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
