import {
  Link,
  Form,
  redirect,
  useNavigation,
  useActionData,
} from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const errors = { msg: "" };
  if (data.password.length < 3) {
    errors.msg = "password is too short";
    return errors;
  }
  try {
    await customFetch.post("/auth/login", data);
    toast.success("Login successful");
    return redirect("/dashboard");
  } catch (error) {
    //     toast.error(error?.response?.data?.msg);
    //  return error;
    errors.msg = error?.response?.data?.msg;
    return errors;
  }
};

export const Login = () => {
  const errors = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
        {errors?.msg && <p style={{ color: "red" }}>{errors.msg}</p>}
        <FormRow
          type="text"
          placeholder="Email or Username"
          LabelText="Email"
          name="email"
        />

        <FormRow
          type="password"
          placeholder="type your password here"
          LabelText="Password"
          name="password"
        />

        <button type="submit" className="btn btn-block">
          {isSubmitting ? "Signing In ..." : "Log In"}
        </button>
        <button type="submit" className="btn btn-block">
          Explorer the App
        </button>
        <p>
          Dont have an account yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Login;
