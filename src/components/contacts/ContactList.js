import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ContactService } from "../services/ContactService";
import Sppiner from "../Sppiner";

let ContactList = () => {
  //search contact
  let [query, setQuery] = useState({
    text: "",
  });

  let [state, setState] = useState({
    loading: false,
    contacts: [],
    filtercontact: [],
    error: "",
  });

  useEffect(() => {
    async function fetcData() {
      try {
        setState({ ...state, loading: true });
        let response = await ContactService.getAllContacts();
        setState({
          ...state,
          loading: false,
          contacts: response.data,
          filtercontact: response.data,
        });
      } catch (error) {
        setState({
          ...state,
          loading: false,
          error: error.message,
        });
      }
    }
    fetcData();
  }, []);

  // delate contact

  let clickDelate = async (contactId) => {
    try {
      let response = await ContactService.delateAccount(contactId);
      if (response) {
        setState({ ...state, loading: true });
        let response = await ContactService.getAllContacts();
        setState({
          ...state,
          loading: false,
          contacts: response.data,
          filtercontact: response.data,
        });
      }
    } catch (error) {
      setState({
        ...state,
        loading: false,
        error: error.message,
      });
    }
  };

  //search Contact

  let searchContact = (e) => {
    setQuery({
      ...query,
      text: e.target.value,
    });
    let theContact = state.contacts.filter((contact) => {
      return contact.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setState({
      ...state,
      filtercontact: theContact,
    });
  };

  let { loading, error, contacts, filtercontact } = state;
  return (
    <>
      <section className="contact-search p-3">
        <div className="container">
          <div className="grid ">
            <div className="row">
              <div className="col">
                <p className="h3 text-center fw-bold mt-4">
                  Welcome to Contact Manager
                </p>
                <p className="h5 text-center mt-3">
                  If you want to add new contact click the button
                  <Link
                    to={"/contact/add"}
                    className="btn bttn ms-2 text-center"
                  >
                    <i className="fa fa-plus-circle me-2 "></i> New
                  </Link>
                </p>
                <p className="">
                  {" "}
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                  Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                  natoque penatibus et magnis dis parturient montes, nascetur
                  ridiculus mus. Donec quam felis, ultricies nec, pellentesque
                  eu, pretium quis, sem. Nulla consequat massa quis enim.
                </p>
              </div>
            </div>
            <div className="row p-2">
              <div className="col-md-6">
                <div className="row">
                  <div className="col">
                    <div className="mb-2">
                      <input
                        name="text"
                        value={query.text}
                        onChange={searchContact}
                        type="text"
                        className="form-control"
                        placeholder="Search Here"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-2">
                      <button className="btn bttn" value="search">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {loading ? (
        <Sppiner />
      ) : (
        <React.Fragment>
          <section>
            <div className="contact-list">
              <div className="container">
                <div className="row">
                  {filtercontact.length > 0 &&
                    filtercontact.map((contact) => {
                      return (
                        <div className="col-md-6 " key={contact.id}>
                          <div className="card my-2">
                            <div className="card-body shadoww">
                              <div className="row align-items-center">
                                <div className="col-md-4">
                                  <img
                                    src={contact.photo}
                                    alt=""
                                    className="contact-img mx-auto"
                                  />
                                </div>
                                <div className="col-md-7">
                                  <ul className="list-group">
                                    <li className="list-group-item list-group-item-action">
                                      Name:{" "}
                                      <span className="fw-bold text-black fs-6">
                                        {contact.name}
                                      </span>
                                    </li>
                                    <li className="list-group-item list-group-item-action">
                                      Mobile:{" "}
                                      <span className="fw-bold text-black fs-6">
                                        {" "}
                                        {contact.mobile}
                                      </span>
                                    </li>
                                    <li className="list-group-item list-group-item-action">
                                      Email:{" "}
                                      <span className="fw-bold text-black fs-6">
                                        {" "}
                                        {contact.email}
                                      </span>
                                    </li>
                                  </ul>
                                </div>
                                <div className="col-md-1 d-flex flex-lg-column flex-sm-row align-items-center ">
                                  <Link
                                    to={`/contact/view/${contact.id}`}
                                    className="btn btn-warning my-1 ms-1"
                                  >
                                    <i className="fa fa-eye"></i>
                                  </Link>
                                  <Link
                                    to={`/contact/edit/${contact.id}`}
                                    className="btn btn-primary my-1 ms-1"
                                  >
                                    <i className="fa fa-pen"></i>
                                  </Link>
                                  <button className="btn btn-danger ms-1">
                                    <i
                                      className="fa fa-trash my-1 "
                                      onClick={() => clickDelate(contact.id)}
                                    ></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </section>
        </React.Fragment>
      )}
    </>
  );
};

export default ContactList;
