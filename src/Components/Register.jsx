import React, { useEffect, useState } from "react";
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import googleImage from "../assets/google.png";
import { registerSchema } from "./registerValidation";
import { MdOutlineErrorOutline } from "react-icons/md";
import { rules } from "./registerValidation";
import { toast } from "react-toastify";

const Register = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const [success, setSuccess] = useState(false);

  //error state

  const [errors, setErrors] = useState({});

  const [isHover, setIsHover] = useState(false);

  //check submit state

  const [submitting, setSubmitting] = useState(false);

  //form data state
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    confirmPw: "",
    terms: false,
  });

  // validate fn

  const validate = async (formData) => {
    let nerErrors = {};
    try {
      setSuccess(true);
      await registerSchema.validate(formData, { abortEarly: false });
    } catch (err) {
      err.inner.forEach((err) => {
        nerErrors[err.path] = err.message;
      });
    }
    if (nerErrors) {
      setErrors(nerErrors);
    }
  };

  //onChange fn

  const handleChange =  (e) => {
    const { name, value, checked, type } = e.target;

    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // onSubmit fn

  const handleSubmit = (e) => {
    e.preventDefault();
    validate(formData);
    setSubmitting(true);
  };

  //onBlur fn

  const handleBlur = () => {
    validate(formData);
  };

  //useEffect for submit
  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      toast.success("Submitted Successfully")
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        password: "",
        confirmPw: "",
        terms: false,
      });
      setSuccess(false)
    }
  }, [errors]);

  return (
    <div className="mt-6  w-[550px] px-3 ">
      <form
        className="grid grid-cols-2 gap-4 gap-y-6 mt-3 "
        onSubmit={handleSubmit}
      >
        {/* input div */}
        <div
          className={`border p-3 flex justify-between items-center rounded-sm ${
            errors.firstname ? "border-red-500 border-2" : ""
          } ${!errors.firstname && success && "border-blue_primary border-2"}`}
        >
          <input
            type="text"
            className=" outline-none w-[90%] placeholder:text-[14px] placeholder:select-none"
            placeholder="First Name"
            name="firstname"
            id="firstname"
            value={formData.firstname}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <span>*</span>
        </div>

        {/* input div */}
        <div
          className={`border p-3 flex justify-between items-center rounded-sm ${
            errors.lastname ? "border-red-500 border-2 " : ""
          }${!errors.lastname && success && "border-blue_primary border-2"}`}
        >
          <input
            type="text"
            className=" outline-none w-[90%] placeholder:text-[14px] placeholder:select-none"
            placeholder="Last Name"
            name="lastname"
            id="lastname"
            value={formData.lastname}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <span>*</span>
        </div>

        {/* error display */}

        <div className="flex  items-center col-span-2 relative">
          {errors.firstname && (
            <div className="flex gap-x-3 items-center basis-[50%]">
              <MdOutlineErrorOutline size={18} className="text-red-500" />
              <p className=" text-red-500">{errors && errors.firstname}</p>
            </div>
          )}
          {errors.lastname && (
            <div className="flex gap-x-3 items-center basis-[50%] absolute right-[35px]">
              <MdOutlineErrorOutline size={18} className="text-red-500" />
              <p className=" text-red-500">{errors && errors.lastname}</p>
            </div>
          )}
        </div>

        {/* input div */}

        <div
          className={` border p-3 flex justify-between items-center rounded-sm ${
            errors.email ? "border-red-500 border-2" : ""
          } ${!errors.email && success && "border-blue_primary border-2"}`}
        >
          <input
            type="text"
            className=" outline-none w-[90%] placeholder:text-[14px] placeholder:select-none"
            placeholder="Email ID"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <span>*</span>
        </div>

        {/* input div */}

        <div className="border p-3 flex justify-between items-center rounded-sm">
          <input
            type="number"
            inputMode="numeric"
            onInput={(e) => (e.target.value = e.target.value.slice(0, 10))}
            className="outline-none w-[90%] placeholder:text-[14px] placeholder:select-none"
            placeholder="Phone Number(optional)"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        {/* error display */}
        <div className="flex  items-center col-span-2 relative">
          {errors.email && (
            <div className="flex gap-x-3 items-center basis-[50%]">
              <MdOutlineErrorOutline size={18} className="text-red-500" />
              <p className=" text-red-500 select-none">
                {errors && errors.email}
              </p>
            </div>
          )}
        </div>

        {/* input div */}
        <div
          className={`border p-3 flex justify-between items-center rounded-sm col-span-2 relative ${
            errors.password ? "border-red-500 border-2" : ""
          } ${!errors.password && success && "border-blue_primary border-2"}`}
        >
          <input
            type={`${open ? "text" : "password"}`}
            className=" outline-none w-[90%] placeholder:text-[14px] placeholder:select-none"
            name="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <div className="flex gap-x-2 items-center">
            {open ? (
              <BsEye
                size={20}
                className=" cursor-pointer text-gray-500"
                onClick={() => setOpen(!open)}
              />
            ) : (
              <BsEyeSlash
                size={20}
                className="cursor-pointer text-gray-500"
                onClick={() => setOpen(!open)}
              />
            )}

            <IoIosInformationCircleOutline
              size={20}
              className={`cursor-pointer text-gray-500 ${
                errors.password && "text-red-500"
              }`}
              onClick={() => setIsHover(!isHover)}
            />
          </div>

          <div
            className={` absolute right-[1px] top-[2.2rem]  w-[330px] bg-blue_secondary z-10 rounded-lg p-3 px-[15px] grid gap-y-[15px] ${
              isHover ? "block duration-100 transition-transform" : "hidden"
            }`}
          >
            {rules.map((rule, index) => {
              let cn =
                formData.password && formData.password.match(rule.pattern)
                  ? "text-gray-400 font-medium"
                  : "text-red-500";
              return (
                <li
                  key={index}
                  className={`${cn} text-[11px] font-medium select-none`}
                >
                  {rule.label}
                </li>
              );
            })}
          </div>
        </div>

        {/* input div */}
        <div
          className={`border p-3 col-span-2 flex justify-between items-center rounded-sm ${
            errors.confirmPw ? "border-red-500 border-2" : ""
          } ${!errors.confirmPw && success && "border-blue_primary border-2"} `}
        >
          <input
            type={`${open2 ? "text" : "password"}`}
            className="outline-none w-[90%] placeholder:text-[14px] placeholder:select-none"
            name="confirmPw"
            id="confirmPw"
            placeholder="Confirm Password"
            value={formData.confirmPw}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <div className="flex gap-x-2 items-center">
            {open2 ? (
              <BsEye
                size={20}
                className=" cursor-pointer text-gray-500"
                onClick={() => setOpen2(!open2)}
              />
            ) : (
              <BsEyeSlash
                size={20}
                className="cursor-pointer text-gray-500"
                onClick={() => setOpen2(!open2)}
              />
            )}
          </div>
        </div>

        {/* error display */}
        <div className="flex  items-center col-span-2 relative">
          {errors.confirmPw && (
            <div className="flex gap-x-3 items-center">
              <MdOutlineErrorOutline size={18} className="text-red-500" />
              <p className=" text-red-500">{errors && errors.confirmPw}</p>
            </div>
          )}
        </div>

        {/* input div */}

        <div className="col-span-2 flex items-center gap-x-3">
          <input
            className="input_custom"
            type="checkbox"
            name="terms"
            id="terms"
            checked={formData.terms}
            onChange={handleChange}
          />
          <label
            htmlFor="terms"
            className={` text-[14px] cursor-pointer select-none text-gray-400 font-semibold ${
              errors.terms && "text-red-500"
            }`}
          >
            By creating an account,you agree to our{" "}
            <span>Terms of Service</span>{" "}
          </label>
        </div>

        <button className="border col-span-2 p-3 bg-blue_primary text-white rounded-md font-semibold  hover:shadow-[inset_0_0_0_200px_rgba(0,0,0,0.5)]">
          Sign up
        </button>
      </form>
      <p className=" mt-6 text-gray-400 font-semibold">
        Already have an account?
        <Link to={"/login"} className=" text-blue_primary  font-semibold">
          {" "}
          Sign in
        </Link>
      </p>
      <h2 className=" mt-6 custom2 text-center text-[13px] text-gray-400 font-semibold">
        OR
      </h2>
      <div className="flex w-full justify-around items-center gap-x-6 mt-6 bg-blue_secondary p-4 cursor-pointer rounded-lg">
        <img src={googleImage} alt="google" className=" size-[30px]" />
        <Link className=" mr-[7.71rem]">Continue with Google</Link>
      </div>
    </div>
  );
};

export default Register;
