import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar/Nabvar";
import Login from "../components/pages/Login";
import Singup from "../components/pages/Singup";
import { AuthProvider } from "../context/AuthContext";
import "../styles/App.css";
import AddContacts from "./contacts/AddContacts";
import ContactList from "./contacts/ContactList";
import EditContact from "./contacts/EditContact";
import ViewContact from "./contacts/ViewContact";

let App = () => {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path={"/"} element={<Navigate to={"/Login"} />} />
            <Route path={"/Login"} element={<Login />} />
            <Route path={"/Signup"} element={<Singup />} />
            <Route path={"/contact/list"} element={<ContactList />} />
            <Route path={"/contact/add"} element={<AddContacts />} />
            <Route
              path={"/contact/view/:contactId"}
              element={<ViewContact />}
            />
            <Route
              path={"/contact/edit/:contactId"}
              element={<EditContact />}
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};
export default App;
