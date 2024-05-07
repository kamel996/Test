import React from "react";
import { RouteProps, useLocation, Navigate } from "react-router-dom";
import { useAppSelector } from "@/config/store.ts";
import ErrorBoundary from "@/shared/error/error-boundary.tsx";
import {ProgressSpinner} from "primereact/progressspinner";

export const PrivateRoute = ({ children = [], ...rest }: RouteProps) => {
  const isAuthenticated = useAppSelector((state) => state.authentication.isAuthenticated);
  const sessionHasBeenFetched = useAppSelector((state) => state.authentication.sessionHasBeenFetched);

  const location = useLocation();

  if (!children) {
    throw new Error(
      `A component needs to be specified for private route for path ${(rest as any).path}`,
    );
  }


  if (isAuthenticated) {
    return <ErrorBoundary>{children}</ErrorBoundary>;
  }

    if (!sessionHasBeenFetched) {
        return (
            <div className={"flex align-items-center justify-content-center"}>
                <ProgressSpinner />
            </div>
        );
    }


  return (
    <Navigate
      to={{
        pathname: "/login",
        search: location.search,
      }}
      replace
      state={{ from: location }}
    />
  );
};

export default PrivateRoute;
