import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "@/routes";

import AuthProvider from "@providers/AuthProvider";
import CityProvider from "@providers/CityProvider";
import CitiesProvider from "@providers/CitiesProvider";
import SpinnerFullPage from "@components/SpinnerFullPage";

function App() {
  return (
    <AuthProvider>
      <CityProvider>
        <CitiesProvider>
          <Suspense fallback={<SpinnerFullPage />}>
            <RouterProvider router={router} />;
          </Suspense>
        </CitiesProvider>
      </CityProvider>
    </AuthProvider>
  );
}

export default App;
