import { Route, Switch, Redirect } from "react-router-dom";
import ContactsPage from "../components/pages/ContactsPage";
import LoginPage from "../components/pages/LoginPage";
import RegistrationPage from "../components/pages/RegistrationPage";
const PagesRouter = () => {
  return (
    <div className="app-page">
      <Switch>
        <Route
          path="/contacts"
          render={() =>
            localStorage.getItem("id") ? (
              <ContactsPage />
            ) : (
              <Redirect to="/registration" />
            )
          }
        ></Route>
        <Route
          path="/"
          render={() =>
            localStorage.getItem("id") ? (
              <ContactsPage />
            ) : (
              <Redirect to="/registration" />
            )
          }
        ></Route>
        <Route path="/login" component={LoginPage}></Route>
        <Route path="/registration" component={RegistrationPage}></Route>
      </Switch>
    </div>
  );
};

export default PagesRouter;
