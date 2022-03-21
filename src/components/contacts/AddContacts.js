import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContactService } from "../services/ContactService";

let AddContacts = () => {
  let navigate = useNavigate();

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

  let updateInfo = (event) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [event.target.name]: event.target.value,
      },
    });
  };
  useState(() => {
    async function fetchdata() {
      try {
        setState({ ...state, loading: true });
        let response = await ContactService.getGroups();
        setState({
          ...state,
          loading: false,
          groups: response.data,
        });
      } catch {}
    }
    fetchdata();
  });

  //submit form
  let submitForm = async (e) => {
    e.preventDefault();
    try {
      let response = await ContactService.createContact(state.contact);
      if (response) {
        navigate("/contact/list", { response: true });
      }
    } catch (error) {
      setState({ ...state, error: error.message });
      navigate("/contact/add", { response: false });
    }
  };

  let { contact, groups } = state;
  return (
    <>
      <section className="add-contact p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 text-success fw-bold">Create a account</p>
              <p className="">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <form onSubmit={submitForm}>
                <div className="mb-2">
                  <input
                    required={true}
                    name="name"
                    value={contact.name}
                    onChange={updateInfo}
                    type="text"
                    className="form-control"
                    placeholder="Name"
                  />
                </div>
                <div className="mb-2">
                  <input
                    required={true}
                    name="photo"
                    value={contact.photo}
                    onChange={updateInfo}
                    type="text"
                    className="form-control"
                    placeholder="Photo Url"
                  />
                </div>
                <div className="mb-2">
                  <input
                    required={true}
                    name="mobile"
                    value={contact.mobile}
                    onChange={updateInfo}
                    type="number"
                    className="form-control"
                    placeholder="Mobile Number"
                  />
                </div>
                <div className="mb-2">
                  <input
                    required={true}
                    name="email"
                    value={contact.email}
                    onChange={updateInfo}
                    type="Email"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>
                <div className="mb-2">
                  <input
                    required={true}
                    name="company"
                    value={contact.company}
                    onChange={updateInfo}
                    type="text"
                    className="form-control"
                    placeholder="Company Name"
                  />
                </div>
                <div className="mb-2">
                  <input
                    required={true}
                    name="title"
                    value={contact.title}
                    onChange={updateInfo}
                    type="text"
                    className="form-control"
                    placeholder="Title"
                  />
                </div>
                <div className="mb-2">
                  <select
                    className="form-control"
                    required={true}
                    name="groupId"
                    value={contact.groupId}
                    onChange={updateInfo}
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
                    value="Create"
                  />
                  <Link to={"/contact/list"} className="btn btn-dark ms-2 mt-2">
                    Close
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddContacts;
