import {Route} from "react-router-dom";
import PageNotFound from "./shared/error/PageNotFound";
import Dashboard from "./modules/dashboard/Dashboard";
import Login from "@/modules/auth/Login.tsx";
import PrivateRoute from "@/shared/auth/PrivateRoute.tsx";
import ErrorBoundaryRoutes from "@/shared/error/error-boundary-routes.tsx";
import ResetPassword from "@/modules/auth/ResetPassword.tsx";
import ForgotPassword from "@/modules/auth/ForgotPassword.tsx";

const AppRoutes = () => {

  return (
    <div>
        <ErrorBoundaryRoutes>
           <Route path="login" element={<Login /> } />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
                path="/"
                element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>}
            />


           <Route path="*" element={<PageNotFound />} /> {/*Should be last route */}
        </ErrorBoundaryRoutes>
    </div>
  );
};

export default AppRoutes;
