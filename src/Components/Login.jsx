import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import googleImage from "../assets/google.png";
import { loginSchema } from "./loginValidation";
import { MdOutlineErrorOutline } from "react-icons/md";
import { toast } from "react-toastify";

const Login = () => {
  //form data state

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  //check submit state

  const [submitting, setSubmitting] = useState(false);

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  //onChange fn

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // validate fn

  const validate = async (formData) => {
    let nerErrors = {};
    try {
      setSuccess(true);
      await loginSchema.validate(formData, { abortEarly: false });
    } catch (err) {
      err.inner.forEach((err) => {
        nerErrors[err.path] = err.message;
      });
    }
    if (nerErrors) {
      setErrors(nerErrors);
    }
  };

  //onSubmit fn
  const handleSubmit = (e) => {
    e.preventDefault();
    validate(formData);
    setSubmitting(true);
  };

  //onBlur fn

  const handleBlur = () => {
    validate(formData);
  };

    useEffect(() => {
      if (Object.keys(errors).length === 0 && submitting) {
        toast.success("Login Success");
        setFormData({
          email: "",
          password: "",
        });
        setSuccess(false);
      }
    }, [errors]);

  return (
    <div className="mt-[3rem]  w-[460px] px-3">
      <form className="grid gap-4 gap-y-6 mt-3" onSubmit={handleSubmit}>
        <div
          className={` border p-3 rounded-sm  ${
            errors.email ? "border-red-500 border-2" : ""
          } ${!errors.email && success && "border-blue_primary border-2"}`}
        >
          <input
            type="text"
            className=" outline-none  placeholder:text-[14px]"
            placeholder="Email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div className="flex  items-center relative">
          {errors.email && (
            <div className="flex gap-x-3 items-center ">
              <MdOutlineErrorOutline size={18} className="text-red-500" />
              <p className=" text-red-500">{errors && errors.email}</p>
            </div>
          )}
        </div>

        <div
          className={`border p-3 rounded-sm ${
            errors.password ? "border-red-500 border-2" : ""
          } ${!errors.password && success && "border-blue_primary border-2"} `}
        >
          <input
            type="password"
            className=" outline-none  placeholder:text-[14px]"
            name="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="flex  items-center relative">
          {errors.password && (
            <div className="flex gap-x-3 items-center ">
              <MdOutlineErrorOutline size={18} className="text-red-500" />
              <p className=" text-red-500">{errors && errors.password}</p>
            </div>
          )}
        </div>
        <div className=" flex items-center justify-between">
          <div className=" flex items-center gap-x-2">
            <input
              className="input_custom"
              type="checkbox"
              name="terms"
              id="terms"
            />
            <label
              htmlFor="terms"
              className="  cursor-pointer select-none text-gray-400"
            >
              Save Password
            </label>
          </div>
          <Link className="text-gray-400 underline">Forget Password</Link>
        </div>
        <button className="border p-3 bg-blue_primary text-white rounded-md font-semibold  hover:shadow-[inset_0_0_0_200px_rgba(0,0,0,0.5)]">
          Sign in
        </button>
      </form>
      <p className=" mt-6 text-gray-400 font-medium">
        Don't have an account?
        <Link to={"/"} className=" text-blue_primary  font-semibold">
          {" "}
          Sign up
        </Link>
      </p>
      <h2 className=" mt-6 custom3 text-center text-[13px] text-gray-400 font-semibold">
        OR
      </h2>
      <div className="flex w-full justify-around items-center gap-x-6 mt-6 bg-blue_secondary p-3 cursor-pointer rounded-lg">
        <img src={googleImage} alt="google" className=" size-[30px]" />
        <Link className=" mr-[6.71rem]">Continue with Google</Link>
      </div>
    </div>
  );
};

export default Login;
