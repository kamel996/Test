import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import logo from "../../assets/images/logo.jpg";
import { sendForgotPasswordEmail} from "@/shared/reducers/authentication.ts";
import { useAppDispatch, useAppSelector } from "@/config/store.ts";
import {ForgotPasswordModel, ForgotPasswordSchema} from "@/models/auth/forgot-password.model.ts";

export default function ForgotPassword() {
    const dispatch = useAppDispatch();
    const {  loading, errorMessage, emailSentSuccess } = useAppSelector((state) => state.authentication);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordModel>({
        resolver: zodResolver(ForgotPasswordSchema),
    });

    const handleResetPassword = (data: ForgotPasswordModel) => {
        dispatch(sendForgotPasswordEmail(data.email));
    };

    return (
        <div
            className="flex align-items-center justify-content-center"
            style={{ height: "100vh" }}
        >
            <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
                <div className="text-center mb-5">
                    <img className={"mb-3"} src={logo} alt="logo" height={50} />
                    <div className="text-900 text-3xl font-medium mb-3">Send Verification Email</div>
                </div>

                <form onSubmit={handleSubmit(handleResetPassword)}>
                    {!emailSentSuccess && <div className="flex flex-column gap-2">
                        <label htmlFor="email" className="block text-900 font-medium">
                            Email
                        </label>
                        <div className="flex flex-column mb-3">
                            <InputText
                                id="email"
                                disabled={loading}
                                type="email"
                                {...register("email")}
                                placeholder="Enter your email..."
                            />
                            {errors.email && (
                                <small className="text-red-500 pt-1.5">
                                    {errors.email.message}
                                </small>
                            )}
                        </div>
                    </div>
                    }


                    <Button
                        label={loading ? "loading..." : emailSentSuccess ? "Email Sent" : "Send Email"}
                        type={"submit"}
                        severity={emailSentSuccess && "success" as any}
                        className="w-full"
                        disabled={emailSentSuccess || loading}
                    />
                    {errorMessage && <div className="text-red-500">{errorMessage}</div>}
                </form>
            </div>
        </div>
    );
}
