import "@rainbow-me/rainbowkit/styles.css";

import { queryClient, rainbowConfig } from "./config";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { Home, Login } from "./pages";
import { AuthRoute, ProtectedRoute } from "./components";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<ProtectedRoute />}>
        <Route path="/" index element={<Home />} />
      </Route>
      <Route element={<AuthRoute />}>
        <Route path="login" element={<Login />} />
      </Route>
    </>
  )
);

function App() {
  return (
    <WagmiProvider config={rainbowConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()}>
          <RouterProvider router={router} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
