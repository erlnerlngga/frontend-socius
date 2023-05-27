import { toast } from "react-hot-toast";
import { SignUpType, SignInType } from "./types";

function NameVerify(error: SignUpType = {}, values: SignUpType) {
  if (!values.name) {
    error.name = toast.error("Name required", {
      style: {
        borderRadius: "10px",
        background: "#525252",
        color: "#fff",
      },
    });
  } else if (!values.name.trim().length) {
    error.name = toast.error("Name invalid", {
      style: {
        borderRadius: "10px",
        background: "#525252",
        color: "#fff",
      },
    });
  }

  return error;
}

function EmailVerify(error: SignUpType = {}, values: SignUpType) {
  if (!values.email) {
    error.email = toast.error("Email required", {
      style: {
        borderRadius: "10px",
        background: "#525252",
        color: "#fff",
      },
    });
  } else if (!values.email.trim().length) {
    error.email = toast.error("Email invalid", {
      style: {
        borderRadius: "10px",
        background: "#525252",
        color: "#fff",
      },
    });
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    error.email = toast.error("Email invalid", {
      style: {
        borderRadius: "10px",
        background: "#525252",
        color: "#fff",
      },
    });
  }

  return error;
}

export async function SignUpValidation(values: SignUpType) {
  let error = NameVerify({}, values);
  EmailVerify(error, values);

  return error;
}

export async function SignInValidation(values: SignInType) {
  let error = EmailVerify({}, values);

  return error;
}
