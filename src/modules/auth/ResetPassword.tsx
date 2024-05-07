import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import {Navigate, useLocation, useNavigate, useParams} from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import logo from "../../assets/images/logo.jpg";
import {resetPassword, validateResetToken} from "@/shared/reducers/authentication.ts";
import { useAppDispatch, useAppSelector } from "@/config/store.ts";
import {ResetPasswordModel, ResetPasswordSchema} from "@/models/auth/reset-password.model.ts";
import {useEffect} from "react";
import {ProgressSpinner} from "primereact/progressspinner";
import {InputIcon} from "primereact/inputicon/inputicon";
import {IconField} from "primereact/iconfield/iconfield";

export default function ResetPassword() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { token } = useParams();
    const {  loading, errorMessage, resetSuccess, validatedResetToken,resetTokenError,isAuthenticated, sessionHasBeenFetched } =
        useAppSelector((state) => state.authentication);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordModel>({
        resolver: zodResolver(ResetPasswordSchema),
    });

    const handleResetPassword = (data: ResetPasswordModel) => {
        dispatch(resetPassword(data));
    };

    const validateToken = () => {
        if(sessionHasBeenFetched && token && !isAuthenticated){
            dispatch(validateResetToken(token))
        }
    };

    useEffect(() => {
        validateToken();
    },[sessionHasBeenFetched]);

    const { from } = (location.state) || {
        from: { pathname: "/", search: location.search },
    };

    if (isAuthenticated || resetTokenError) {
        return <Navigate to={from} replace />;
    }


    if(!validatedResetToken) {
        return <div className="flex align-items-center justify-content-center w-full h-full">
                   <ProgressSpinner/>
               </div>
    }


    return (
        <div
            className="flex align-items-center justify-content-center"
            style={{height: "100vh" }}
        >
            <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
                <div className="text-center mb-5">
                    <img className={"ml-auto"} src={logo} alt="logo" height={50} />
                    <div className="text-900 text-3xl font-medium mb-3">{resetSuccess ? "Password Reset Successful" : "Reset Your Password"}</div>
                </div>
                {resetSuccess ?
                    <div className="d-flex flex-column align-items-center">
                        <div className="text-center my-5">
                            <div>
                                <i className="pi pi-check text-6xl bg-green-500 text-white border-circle p-6"/>
                            </div>
                            <p>
                                Congratulations! Your password has been successfully reset. You can now log in to your account with your new password.
                            </p>
                            <div>
                                <Button
                                    label="Login Now"
                                    onClick={() => navigate("/login")}
                                    type="submit"
                                    className="w-4 mt-3"
                                    disabled={loading}
                                />
                            </div>
                        </div>
                    </div>
                    :
                    <form onSubmit={handleSubmit(handleResetPassword)}>
                        <input type="hidden" {...register("token")} value={token}/>
                        <div className="flex flex-column gap-2">
                            <label htmlFor="password" className="block text-900 font-medium">
                                Password
                            </label>
                            <IconField iconPosition="left">
                                    <InputIcon className="pi pi-search"> </InputIcon>
                                    <InputText v-model="value1" placeholder="Search" />
                                </IconField>

                                <IconField>
                                    <InputIcon className="pi pi-spin pi-spinner"> </InputIcon>
                                    <InputText v-model="value2" />
                                </IconField>
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

                        <div className="flex flex-column gap-2">
                            <label htmlFor="password" className="block text-900 font-medium">
                                Confirm Password
                            </label>
                            <div className="flex flex-column mb-3">
                                <InputText
                                    disabled={loading}
                                    type="password"
                                    {...register("confirmPassword")}
                                    placeholder="Password"
                                />
                                {errors.confirmPassword && (
                                    <small className="text-red-500 pt-1.5">
                                        {errors.confirmPassword.message}
                                    </small>
                                )}
                            </div>
                        </div>

                        <Button
                            label={loading ? "loading..." : "Reset Password"}
                            size={"small"}
                            type={"submit"}
                            className="w-full"
                            disabled={loading}
                        />
                        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
                    </form>
                }


            </div>
        </div>
    );
}
