import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ContactService } from "../services/ContactService";
import Sppiner from "../Sppiner";
let EditContact = () => {
  let navigate = useNavigate();

  let { contactId } = useParams();

  let [state, setState] = useState({
    loading: false,
    contact: {
      name: "",
      photo: "",
      mobile: "",
      email: "",
      company: "",
      title: "",
      groupId: "",
    },
    groups: [],
    error: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        setState({ ...state, loading: true });
        let response = await ContactService.getContact(contactId);
        let groupResponse = await ContactService.getGroups();
        setState({
          ...state,
          loading: false,
          contact: response.data,
          groups: groupResponse.data,
        });
      } catch (error) {
        setState({
          ...state,
          loading: false,
          error: error.message,
        });
      }
    }
    fetchData();
  }, [contactId]);

  let updateInput = (e) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [e.target.name]: e.target.value,
      },
    });
  };

  //edit submit
  let editSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await ContactService.editContact(state.contact, contactId);
      if (response) {
        navigate("/contact/list", { response: true });
      }
    } catch (error) {
      setState({ ...state, error: error.message });
      navigate(`/contact/edit/${contactId}`, { response: false });
    }
  };

  let { loading, contact, error, groups } = state;

  return (
    <React.Fragment>
      {loading ? (
        <Sppiner />
      ) : (
        <React.Fragment>
          <section className="add-contact p-3">
            <div className="container">
              <div className="row">
                <div className="col">
                  <p className="h3 text-success fw-bold">Edit Your Contact</p>
                  <p className="">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.
                  </p>
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col-md-4">
                  <form onSubmit={editSubmit}>
                    <div className="mb-2">
                      <input
                        required={true}
                        name="name"
                        onChange={updateInput}
                        value={contact.name}
                        type="text"
                        className="form-control"
                        placeholder="Name"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        required={true}
                        name="photo"
                        onChange={updateInput}
                        value={contact.photo}
                        type="text"
                        className="form-control"
                        placeholder="Photo Url"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        required={true}
                        name="mobile"
                        onChange={updateInput}
                        value={contact.mobile}
                        type="number"
                        className="form-control"
                        placeholder="Mobile Number"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        required={true}
                        name="email"
                        onChange={updateInput}
                        value={contact.email}
                        type="Email"
                        className="form-control"
                        placeholder="Email"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        required={true}
                        name="comapny"
                        onChange={updateInput}
                        value={contact.company}
                        type="text"
                        className="form-control"
                        placeholder="Company Name"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        required={true}
                        name="title"
                        onChange={updateInput}
                        value={contact.title}
                        type="text"
                        className="form-control"
                        placeholder="Title"
                      />
                    </div>
                    <div className="mb-2">
                      <select
                        required={true}
                        name="groupId"
                        onChange={updateInput}
                        value={contact.groupId}
                        className="form-control"
                      >
                        <option value="">Select a group</option>
                        {groups.length > 0 &&
                          groups.map((group) => {
                            return (
                              <option key={group.id} value={group.id}>
                                {group.name}
                              </option>
                            );
                          })}
                      </select>
                      <input
                        type="submit"
                        className="btn btn-success mt-2"
                        value="Update"
                      />
                      <Link
                        to={"/contact/list"}
                        className="btn btn-dark ms-2 mt-2"
                      >
                        Close
                      </Link>
                    </div>
                  </form>
                </div>
                <div className="col-md-6 align-items-center">
                  <img
                    src={contact.photo}
                    className="contact-img"
                    alt="avatar"
                  ></img>
                </div>
              </div>
            </div>
          </section>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
export default EditContact;
