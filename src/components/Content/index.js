import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "@/components/Layout";
import RoutesConfig from "@/configs/routes";

const Content = ({ isAdmin }) => {
  return (
    <Routes>
      {RoutesConfig.map((route, index) => {
        if (!route?.submenu) {
          return (
            <Route
              key={index}
              path={route?.path}
              index={route?.index || false}
              element={
                !route?.admin ? (
                  <Layout {...route} />
                ) : isAdmin ? (
                  <Layout {...route} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
          );
        } else {
          return route.submenu.map((submenu, index) => {
            return (
              <Route
                key={index}
                path={submenu?.path}
                index={submenu?.index || false}
                element={
                  !route?.admin && !route?.submenu?.admin ? (
                    <Layout {...submenu} />
                  ) : isAdmin ? (
                    <Layout {...submenu} />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
            );
          });
        }
      })}
    </Routes>
  );
};

Content.defaultProps = {
  isAdmin: false,
};

export default Content;
