import AppRoutes from "@/routes";
import { PrimeReactProvider } from 'primereact/api';

import {useEffect, useRef} from "react";
import {useAppDispatch} from "@/config/store.ts";
import {getSession} from "@/shared/reducers/authentication.ts";

function App() {
    const dispatch = useAppDispatch();
    const ignoreRef = useRef(false);

    useEffect(() => {
        if (!ignoreRef.current) {
            ignoreRef.current = true;
            dispatch(getSession());
        }
    }, []);

  return (
      <PrimeReactProvider>
      <AppRoutes />
    </PrimeReactProvider>
  );
}

export default App;
