import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ContactService } from "../services/ContactService";
import Sppiner from "../Sppiner";

let ViewContact = () => {
  let { contactId } = useParams();

  let [state, setState] = useState({
    loading: false,
    contact: {},
    error: "",
    group: {},
  });

  useEffect(() => {
    async function fetchData() {
      try {
        setState({ ...state, loading: true });
        let response = await ContactService.getContact(contactId);
        let gropresponse = await ContactService.getGroup(response.data);
        setState({
          ...state,
          loading: false,
          contact: response.data,
          group: gropresponse.data,
        });
      } catch (error) {
        setState({
          ...state,
          loading: true,
          error: error.message,
        });
      }
    }
    fetchData();
  }, [contactId]);

  let { loading, contact, error, group } = state;

  return (
    <>
      <section className="view-contact-intro p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 text-primary fw-bold">View Contact</p>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book
              </p>
            </div>
          </div>
        </div>
      </section>
      {loading ? (
        <Sppiner />
      ) : (
        <React.Fragment>
          {Object.keys(contact).length > 0 && Object.keys(group).length > 0 && (
            <section className="view-contact-main mt-4">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-md-4">
                    <img
                      src={contact.photo}
                      className="contact-img"
                      alt="avatar"
                    ></img>
                  </div>
                  <div className="col-md-8">
                    <ul className="list-group">
                      <li className="list-group-item list-group-item-action">
                        Name:{" "}
                        <span className="fw-bold text-black">
                          {contact.name}
                        </span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Mobile:{" "}
                        <span className="fw-bold text-black">
                          {" "}
                          {contact.mobile}
                        </span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Email:{" "}
                        <span className="fw-bold text-black">
                          {contact.email}
                        </span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Company:{" "}
                        <span className="fw-bold text-black">
                          {contact.company}
                        </span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Title:{" "}
                        <span className="fw-bold text-black">
                          {contact.title}
                        </span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Group:{" "}
                        <span className="fw-bold text-black">{group.name}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <Link to={"/contact/list"} className="btn btn-warning">
                      Back
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )}
        </React.Fragment>
      )}
    </>
  );
};

export default ViewContact;
