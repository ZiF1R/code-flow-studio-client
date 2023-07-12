import React, {FC} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import SigninView from "modules/Auth/views/SigninView";
import DashboardView from "modules/Dashboard/views/DashboardView";
import Recent from "modules/Dashboard/components/Recent";

const App: FC = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SigninView />} />
          <Route path="/dashboard" element={<DashboardView />}>
            <Route index element={<Navigate to="recent" replace />} />
            <Route path="recent" element={<Recent />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
}

export default App;
