import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure({
  position: "bottom-right"
});

const handleError = err => {
  let message = "";
  switch (err) {
    case "Email not found":
      message =
        "The email address that you've entered doesn't match any account. Please sign up.";
      break;
    case "Email already exists":
      message = "This email address is already in use.";
      break;
    case "Password is incorrect":
      message =
        "The password that you've entered is incorrect. Please try again.";
      break;
    default:
      message =
        "We're experiencing a problem with our server. Sorry for the inconvenience. Please try again later.";
      break;
  }

  return toast.error(message);
};

const handleSuccess = message => {
  return toast.success(message, { autoClose: 2000 });
};

export { handleError, handleSuccess };
