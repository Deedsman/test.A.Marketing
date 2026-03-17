import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEmployee, createClient } from "../../redux/action/user";
import { useNavigate } from "react-router-dom";
import Topbar from "./Topbar";
import {
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  DialogActions,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PiNotepad, PiXLight } from "react-icons/pi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { CFormSelect } from "@coreui/react";
import { pakistanCities } from "../../constant";

const schema = yup.object({
  firstName: yup
    .string()
    .trim()
    .matches(/^[a-zA-Z]+([a-zA-Z]+)+$/, "Only letters are allowed!")
    .required("First Name is required"),
  lastName: yup
    .string()
    .trim()
    .matches(/^[a-zA-Z]+([a-zA-Z]+)+$/, "Only letters are allowed!")
    .required("Last Name is required"),
  username: yup.string().trim().required("Username is required"),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Min. 8 chars: 1 uppercase, 1 number & 1 special.",
    )
    .required("Password is required"),
  phone: yup
    .string()
    .required("Phone is required")
    .matches(/^\d+$/, "Phone must be a number"),
  email: yup.string().email("Invalid email format").optional(),
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const CreateUser = ({ open, setOpen, scroll, userType }) => {
  //////////////////////////////////////// VARIABLES /////////////////////////////////////
  const { isFetching } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      phone: "",
    },
  });

  //////////////////////////////////////// STATES /////////////////////////////////////
  const [showPassword, setShowPassword] = useState(false);

  //////////////////////////////////////// USE EFFECTS /////////////////////////////////////

  //////////////////////////////////////// FUNCTIONS /////////////////////////////////////
  const onSubmit = (data) => {
    const actionCreator =
      userType === "clients" ? createClient : createEmployee;
    dispatch(actionCreator(data, setOpen));
    reset();
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  return (
    <div>
      <Dialog
        scroll={scroll}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth="sm"
        maxWidth="sm"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className="flex items-center justify-between">
          <div className="text-sky-400 font-primary">
            Add New {userType === "clients" ? "Client" : "Employee"}
          </div>
          <div className="cursor-pointer" onClick={handleClose}>
            <PiXLight className="text-[25px]" />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-2 p-3 text-gray-500 font-primary">
            <div className="text-xl flex justify-start items-center gap-2 font-normal">
              <PiNotepad size={23} />
              <span>
                {userType === "clients" ? "Client" : "Employee"} Detials
              </span>
            </div>
            <Divider />
            <table className="mt-4">
              <tr>
                <td className="pb-3 text-lg">First Name </td>
                <td className="pb-6">
                  <TextField
                    size="small"
                    fullWidth
                    {...register("firstName")}
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message || " "}
                    FormHelperTextProps={{
                      sx: {
                        top: "38px",
                        position: "absolute",
                      },
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Last Name </td>
                <td className="pb-6">
                  <TextField
                    size="small"
                    fullWidth
                    {...register("lastName")}
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message || " "}
                    FormHelperTextProps={{
                      sx: {
                        top: "38px",
                        position: "absolute",
                      },
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">User Name </td>
                <td className="pb-6">
                  <TextField
                    size="small"
                    fullWidth
                    {...register("username")}
                    error={!!errors.username}
                    helperText={errors.username?.message || " "}
                    FormHelperTextProps={{
                      sx: {
                        top: "38px",
                        position: "absolute",
                      },
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Email </td>
                <td className="pb-6">
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="Optional"
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email?.message || " "}
                    FormHelperTextProps={{
                      sx: {
                        top: "38px",
                        position: "absolute",
                      },
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td className="flex items-start pt-2 text-lg">Password </td>
                <td className="pb-6 relative">
                  <TextField
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    error={!!errors.password}
                    helperText={errors.password?.message || " "}
                    size="small"
                    fullWidth
                    FormHelperTextProps={{
                      sx: {
                        top: "38px",
                        position: "absolute",
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <div
                          className="cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <AiOutlineEyeInvisible size={20} />
                          ) : (
                            <AiOutlineEye size={20} />
                          )}
                        </div>
                      ),
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td className="flex items-start pt-2 text-lg">Phone </td>
                <td className="pb-6">
                  <TextField
                    type="number"
                    size="small"
                    {...register("phone")}
                    error={!!errors.phone}
                    helperText={errors.phone?.message || " "}
                    fullWidth
                    FormHelperTextProps={{
                      style: { minHeight: "1.5em" },
                    }}
                  />
                </td>
              </tr>
            </table>
          </div>
        </DialogContent>
        <DialogActions>
          <button
            onClick={handleClose}
            variant="contained"
            type="reset"
            className="bg-[#d7d7d7] px-4 py-2 rounded-lg text-gray-500 mt-4 hover:text-white hover:bg-[#6c757d] border-[2px] border-[#efeeee] hover:border-[#d7d7d7] font-thin transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            className="bg-primary-red px-4 py-2 rounded-lg text-white mt-4 hover:bg-red-400 font-thin"
          >
            {isFetching ? "Submitting..." : "Submit"}
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateUser;
