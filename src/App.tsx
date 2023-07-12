import React, {FC} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SigninView from "modules/Auth/views/SigninView";
import DashboardView from "modules/Dashboard/views/DashboardView";

const App: FC = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SigninView />} />
          <Route path="/dashboard" element={<DashboardView />} />
          {/*<Route path="/" element={<Layout />}>*/}
          {/*  <Route index element={<MainPage />} />*/}
          {/*</Route>*/}
        </Routes>
      </BrowserRouter>
    );
}

export default App;
