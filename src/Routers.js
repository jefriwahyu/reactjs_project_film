import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { Auth0Provider, withAuthenticationRequired } from "@auth0/auth0-react";
import App from "./App";
import Home from "./Home";
import Actor from "./Actor";
import Film from "./Film";
import Beranda from "./Beranda";
import Detail from "./Detail"

const ProtectedRoute = ({ component, ...args }) => {
  const Component = withAuthenticationRequired(component, args);
  return <Component />;
};

const Auth0ProviderWithRedirectCallback = ({ children, ...props }) => {
  const navigate = useNavigate();
  const onRedirectCallback = (appState) => {
    navigate((appState && appState.returnTo) || window.location.pathname);
  };
  return (
    <Auth0Provider onRedirectCallback={onRedirectCallback} {...props}>
      {children}
    </Auth0Provider>
  );
};

export default function Routers() {
  return (
    <Router>
      <Auth0ProviderWithRedirectCallback
        domain="jefilm.us.auth0.com"
        clientId="SjRkrfCP8eZ9MWBPntbPosY1GyqaDeTK"
        redirectUri={window.location.origin}
      >
        <App />
        <Routes>
          <Route path="/" exact element={<Beranda />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Film" element={<ProtectedRoute component={Film}/>}/>
          <Route path="/Detail/:id" element={<ProtectedRoute component={Detail}/>}/>
          <Route path="/Actor" element={<ProtectedRoute component={Actor} />} />
        </Routes>
      </Auth0ProviderWithRedirectCallback>
    </Router>
  );
}