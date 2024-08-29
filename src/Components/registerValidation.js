import * as Yup from "yup";

export const registerSchema = Yup.object({
  firstname: Yup.string().required().trim(),
  lastname: Yup.string().required().trim(),
  email: Yup.string().required().trim().email(),
  password: Yup.string()
    .trim()
    .matches(
      /^(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?/~`|\\]).*$/,
      "inclusion of at least one special character,e.g.,!@*?"
    )
    .matches(/^(?=.*[a-zA-Z])(?=.*\d).+$/, "A mixture of letters and numbers")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z]).*$/,
      "A mixture of both uppercase and lowercase letters"
    )
    .min(8, "At least 8 characters-the longer,the better")
    .required(),
  confirmPw: Yup.string()
    .oneOf(
      [Yup.ref("password"), null],
      `Passwords doesn't match,Please re-enter correact password`
    )
    .required("confirm password is a required field")
    .trim(),
  terms: Yup.boolean().oneOf(
    [true],
    "You must agree to the terms and conditions"
  ),

  //   phone: Yup.string().matches(/^[0-9]{10}$/, "phone number must be 10 digits"),
});

export const LENGTH_REGEX = new RegExp(/.{8,}$/);
export const UPPERLOWERCASE_REGEX = new RegExp(/^(?=.*[a-z])(?=.*[A-Z]).*$/);

export const LETTERNUMBER_REGEX = new RegExp(/^(?=.*[a-zA-Z])(?=.*\d).+$/);
export const SPECIAL_CHARS_REGEX = new RegExp(/^(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?/~`|\\]).*$/);



  export const rules = [
    {
      label: "At least 8 characters-the longer,the better",
      pattern: LENGTH_REGEX,
    },
    {
      label: "A mixture of both uppercase and lowercase letters",
      pattern: UPPERLOWERCASE_REGEX,
    },
    {
      label: "A mixture of letters and numbers",
      pattern: LETTERNUMBER_REGEX,
    },
    {
      label: "inclusion of at least one special character,e.g.,!@*?",
      pattern: SPECIAL_CHARS_REGEX,
    },
  ];