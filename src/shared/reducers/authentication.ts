import { createAsyncThunk, createSlice, isPending } from "@reduxjs/toolkit";
import axios from "axios";
import { serializeAxiosError } from "@/shared/reducers/reducer-util.ts";
import { AppThunk } from "@/config/store.ts";
import { Storage } from "@/shared/lib/util/storage-util.ts";

export const AUTH_TOKEN_KEY = "access-token";
export const REFRESH_TOKEN_KEY = "refresh-token";

interface IAuthParams {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export const initialState = {
  loading: false,
  isAuthenticated: false,
  loginSuccess: false,
  emailSentSuccess: false,
  loginError: false,
  validatedResetToken: false,
  resetTokenError: false,
  refreshToken: null as string | null,
  sessionHasBeenFetched: false,
  tokenExpiration: null,
  resetSuccess: false,
  errorMessage: null as unknown as string,
  redirectMessage: null as unknown as string,
  logoutUrl: null as unknown as string,
};

export type AuthenticationState = Readonly<typeof initialState>;

export const clearAuthTokens= () => {
    if (Storage.local.get(AUTH_TOKEN_KEY)) {
        Storage.local.remove(AUTH_TOKEN_KEY);
    }
    if (Storage.session.get(AUTH_TOKEN_KEY)) {
        Storage.session.remove(AUTH_TOKEN_KEY);
    }
    if (Storage.local.get(REFRESH_TOKEN_KEY)) {
        Storage.local.remove(REFRESH_TOKEN_KEY);
    }
    if (Storage.session.get(REFRESH_TOKEN_KEY)) {
        Storage.session.remove(REFRESH_TOKEN_KEY);
    }
};

export const clearAccessToken = () => {
  if (Storage.local.get(AUTH_TOKEN_KEY)) {
      Storage.local.remove(AUTH_TOKEN_KEY);
  }
  if (Storage.session.get(AUTH_TOKEN_KEY)) {
      Storage.session.remove(AUTH_TOKEN_KEY);
  }

};

export const login: (
  username: string,
  password: string,
  rememberMe?: boolean,
) => AppThunk =
  (username, password, rememberMe = false) =>
  async (dispatch) => {
    const result = await dispatch(
      authenticate({ username, password, rememberMe }),
    );

    const response = result.payload;
    const bearerToken = response?.token;
    const refreshToken = response?.refreshToken;
    if (bearerToken && refreshToken) {
      Storage.local.set(AUTH_TOKEN_KEY, bearerToken);
      Storage.local.set(REFRESH_TOKEN_KEY, refreshToken);
      dispatch(getSession());
    }
  };


export const logout: () => AppThunk = () => dispatch => {
    clearAuthTokens();
    dispatch(logoutSession());
};


export const getAccount = createAsyncThunk(
  "authentication/get_account",
  async () => {
    const response = await axios.get("accessToken");
    return response?.data;
  },
  {
    serializeError: serializeAxiosError,
  },
);

export const getSession = (): AppThunk => async (dispatch) => {
  await dispatch(getAccount());
};

export const authenticate = createAsyncThunk(
  "authentication/login",
  async (auth: IAuthParams) => {
    const data = {
      username: auth.username,
      password: auth.password,
      rememberMe: auth.rememberMe,
    };
    const response = await axios.post(`/login`, data);
    return response?.data;
  },
  {
    serializeError: serializeAxiosError,
  },
);

export const resetPassword = createAsyncThunk("authentication/reset-password",
    async(data: any) => {
    const response = await axios.post(`/users/resetPassword/${data.token}`, data);
    return response.data;
},
    {
        serializeError: serializeAxiosError,
    },
);

export const validateResetToken = createAsyncThunk("authentication/validate-reset-token",
    async(token: string) => {
    const response = await axios.get(`/validateResetToken/${token}`);
    return response.data;
},
    {
        serializeError: serializeAxiosError,
    },
);

export const sendForgotPasswordEmail = createAsyncThunk("authentication/send-forgot-password-email",
    async(email: string) => {
        const response = await axios.post(`/users/forgotPassword?email=${email}`);
        return response.data;
    },
    {
        serializeError: serializeAxiosError,
    },
);

export const clearAuthentication = messageKey => dispatch => {
    clearAuthTokens();
    dispatch(authError(messageKey));
    dispatch(clearAuth());
};

export const AuthenticationSlice = createSlice({
  name: "authentication",
  initialState: initialState as AuthenticationState,
  reducers: {
    logoutSession() {
      return {
        ...initialState,
      };
    },
    authError(state, action) {
      return {
        ...state,
        redirectMessage: action.payload,
      };
    },
    clearAuth(state) {
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAccount.rejected, (state) => ({
        ...state,
        loading: false,
        isAuthenticated: false,
        sessionHasBeenFetched: true,
      }))
      .addCase(getAccount.fulfilled, (state, action) => {
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          sessionHasBeenFetched: true,
          account: action.payload.data,
        };
      })
      .addCase(authenticate.rejected, () => ({
        ...initialState,
        errorMessage: "Incorrect email or password.",
        loginError: true,
       loading: false,
      }))
      .addCase(authenticate.fulfilled, (state) => ({
        ...state,
        loading: false,
        loginError: false,
        loginSuccess: true,
      }))
      .addCase(resetPassword.rejected, (state) => ({
            ...state,
            errorMessage: "Resetting the password did not work for some reasons.",
            loginError: true,
            loading: false,
      }))
      .addCase(resetPassword.fulfilled, (state) => ({
            ...state,
            validatedResetToken: true,
            loading: false,
            resetSuccess: true,
      }))
      .addCase(sendForgotPasswordEmail.rejected, (state) => ({
            ...state,
            errorMessage: "Email u entered not found.",
            loading: false,
            loginError: true,
      }))
      .addCase(sendForgotPasswordEmail.fulfilled, (state) => ({
            ...state,
            loading: false,
            emailSentSuccess: true,
      }))
      .addCase(validateResetToken.rejected, (state) => ({
            ...state,
            validateResetTokenError: false,
            resetTokenError: true,
            loading: false,
      }))
      .addCase(validateResetToken.fulfilled, (state) => ({
            ...state,
          loading: false,
          validatedResetToken: true,
          resetTokenError: false
      }))
      .addMatcher(isPending(authenticate, getAccount,resetPassword,sendForgotPasswordEmail, validateResetToken), (state) => ({
        ...state,
        loading: true,
      }));
  },
});

export const { logoutSession, authError, clearAuth } =
  AuthenticationSlice.actions;

// Reducer
export default AuthenticationSlice.reducer;
