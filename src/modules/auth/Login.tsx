import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import {Link, Navigate, useLocation} from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import logo from "../../assets/images/logo.jpg";
import { login } from "@/shared/reducers/authentication.ts";
import { useAppDispatch, useAppSelector } from "@/config/store.ts";
import { LoginForm, LoginSchema } from "@/models/auth/login.model.ts";

export default function Login() {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const { isAuthenticated, loading, errorMessage, loginError } = useAppSelector(
    (state) => state.authentication,
  );
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
  });

  const handleLogin = (data: LoginForm) => {
    const { username, password, rememberMe } = data;

    dispatch(login(username, password, rememberMe));
  };

  const { from } = (location.state) || {
    from: { pathname: "/", search: location.search },
  };

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  return (
    <div
      className="flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
        <div className="text-center mb-5">
            <img className={"mb-3"} src={logo} alt="logo" height={50} />
          <div className="text-900 text-3xl font-medium mb-3">Welcome Back</div>
        </div>

        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="flex flex-column gap-2">
            <label htmlFor="username" className="block text-900 font-medium">
              Username
            </label>
            <div className="flex flex-column mb-3">
              <InputText
                  {...register("username")}
                  placeholder="Username"
                  disabled={loading}
                  className="w-full"
              />
              {errors.username && (
                  <small className="text-red-500 pt-1.5">
                    {errors.username.message}
                  </small>
              )}
            </div>
          </div>

          <div className="flex flex-column gap-2">
            <label htmlFor="password" className="block text-900 font-medium">
              Password
            </label>
            <div className="flex flex-column mb-3">
              <InputText
                  disabled={loading}
                  type="password"
                  {...register("password")}
                  placeholder="Password"
              />
              {errors.password && (
                  <small className="text-red-500 pt-1.5">
                    {errors.password.message}
                  </small>
              )}
            </div>
          </div>

          <div className="flex align-items-center justify-content-between mb-6">
            <div className="flex align-items-center">
              <Checkbox
                  id="rememberMe"
                  disabled={loading}
                  className="mr-2"
                  onChange={(e) => {
                    setValue("rememberMe", e.checked as boolean);
                  }}
                  checked={watch("rememberMe")}
              />
              <label htmlFor="rememberme">Remember me</label>
            </div>
            <Link to={"/forgot-password"} className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">
              Forgot your password?
            </Link>
          </div>

          <Button
              label={loading ? "loading..." : "Login"}
              icon="pi pi-user"
              type={"submit"}
              className="w-full"
              disabled={loading}
          />
          {loginError && <div className="text-red-500">{errorMessage}</div>}
        </form>
      </div>
    </div>
  );
}
