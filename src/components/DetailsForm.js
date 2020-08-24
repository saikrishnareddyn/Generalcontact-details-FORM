import React, { useState, useEffect } from "react";
import { Checkbox } from "./Checkbox";
import axios from "axios";
import { v4 } from "uuid";

const languagesSet = [
  "HTML",
  "CSS",
  "JAVASCRIPT",
  "REACT JS",
  "REACT NATIVE",
  "BOOTSTARP",
];

const DetailsForm = ({ handleRefresh, selectedDetails }) => {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    language: [],
    country: "",
  });

  const [errors, setErrors] = useState({
    nameError: "",
    emailError: "",
    phoneError: "",
    genderError: "",
    langauageError: "",
    countryError: "",
  });
  const handleResetForm = () => {
    setErrors({
      nameError: "",
      emailError: "",
      phoneError: "",
      genderError: "",
      langauageError: "",
      countryError: "",
    });
  };

  const validate = () => {
    const { name, email, phone, gender, language, country } = details;
    let customErrors = {};
    if (name.length === 0) {
      customErrors.nameError = "Please enter name";
    }

    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!mailformat.test(email)) {
      customErrors.emailError = "Please enter valid email";
    }
    const phoneFormat = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    if (!phoneFormat.test(phone)) {
      customErrors.phoneError = "please enter mobile number";
    }

    if (gender.length === 0) {
      customErrors.genderError = "please choose gender";
    }
    if (language.length === 0) {
      customErrors.langauageError = "Please choose atlease one langauage";
    }

    if (country.length === 0) {
      customErrors.countryError = "please choose country";
    }

    if (Object.keys(customErrors).length > 0) {
      setErrors(Object.assign({}, errors, customErrors));
      setTimeout(() => handleResetForm(), 5000);
      return false;
    }

    return true;

    // if (details.name == "") {
    //   setErrors(
    //     Object.assign({}, errors, (errors.nameError = "please enter name"))
    //   );
    //   setTimeout(() => {
    //     setErrors(Object.assign({}, errors, (errors.nameError = "")));
    //   }, 5000);
    // }
    // if (!details.email.includes("@" && ".com")) {
    //   setErrors(
    //     Object.assign(
    //       {},
    //       errors,
    //       (errors.emailError = "please enter correct mail")
    //     )
    //   );
    //   setTimeout(() => {
    //     setErrors(Object.assign({}, errors, (errors.emailError = "")));
    //   }, 5000);
    // }
    // if (details.phone.length !== 10) {
    //   setErrors(
    //     Object.assign({}, errors, (errors.phoneError = "please enter phone"))
    //   );
    //   setTimeout(() => {
    //     setErrors(Object.assign({}, errors, (errors.phoneError = "")));
    //   }, 5000);
    // }
    // if (details.gender === "") {
    //   setErrors(
    //     Object.assign({}, errors, (errors.genderError = "please choose gender"))
    //   );
    //   setTimeout(() => {
    //     setErrors(Object.assign({}, errors, (errors.genderError = "")));
    //   }, 5000);
    // }
    // if (details.language == [""]) {
    //   setErrors(
    //     Object.assign(
    //       {},
    //       errors,
    //       (errors.langauageError = "please choose language")
    //     )
    //   );
    //   setTimeout(() => {
    //     setErrors(Object.assign({}, errors, (errors.langauageError = "")));
    //   }, 5000);
    // }
    // if (details.country === "") {
    //   setErrors(
    //     Object.assign(
    //       {},
    //       errors,
    //       (errors.countryError = "please choose country")
    //     )
    //   );
    //   setTimeout(() => {
    //     setErrors(Object.assign({}, errors, (errors.countryError = "")));
    //   }, 5000);
    // }
  };

  useEffect(() => {
    setDetails(Object.assign({}, details, selectedDetails));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetails(Object.assign({}, details, { [name]: value }));
  };

  const handleLanguage = (e) => {
    const selectedLanguage = details.language;
    const { value, name } = e.target;
    if (selectedLanguage.includes(value)) {
      const newSelectedLanguage = selectedLanguage.filter(
        (language) => language !== value
      );
      setDetails(Object.assign({}, details, { [name]: newSelectedLanguage }));
    } else {
      const newSelectedLanguage = selectedLanguage.concat([value]);
      setDetails(Object.assign({}, details, { [name]: newSelectedLanguage }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        if (selectedDetails) {
          await axios.put(
            `http://localhost:4000/details/${selectedDetails.id}`,
            details
          );
        } else {
          details.id = v4();
          await axios.post("http://localhost:4000/details", details);
        }
        handleRefresh();
        handleResetForm();
        setDetails({
          name: "",
          email: "",
          phone: "",
          gender: "",
          language: [],
          country: "",
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="align-items-absolute" style={{ marginTop: "10px" }}>
          <div className="form-group row">
            <div className="col-form-label col-sm-2">
              <label>Name</label>
            </div>
            <div className="col-from-input  col-sm-8">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Please enter your name..."
                onChange={handleInputChange}
                value={details.name}
              />
              {errors.nameError ? (
                <div className="text-danger">{errors.nameError}</div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="form-group row">
            <div className="col-form-label col-sm-2">
              <label>Email</label>
            </div>
            <div className="col-from-input  col-sm-8">
              <input
                type="text"
                name="email"
                className="form-control"
                placeholder="Please enter your email..."
                onChange={handleInputChange}
                value={details.email}
              />
              {errors.emailError ? (
                <div className="text-danger">{errors.emailError}</div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="form-group row">
            <div className="col-form-label col-sm-2">
              <label>Phone</label>
            </div>
            <div className="col-from-input  col-sm-8">
              <input
                type="text"
                name="phone"
                className="form-control"
                placeholder="Please enter your mobile number..."
                onChange={handleInputChange}
                value={details.phone}
              />
              {errors.phoneError ? (
                <div className="text-danger">{errors.phoneError}</div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="form-group row radio">
            <div className="col-form-label col-sm-2">
              <label>Gender</label>
            </div>
            <div className=" col-sm-3 radio">
              <input
                type="radio"
                name="gender"
                style={{ height: "15px", width: "15px", marginTop: "10px" }}
                onChange={handleInputChange}
                value="Male"
                checked={details.gender === "Male"}
              />
              <label style={{ marginLeft: "5px" }}>
                <h5> Male</h5>
              </label>
            </div>
            <div className=" col-sm-3 radio">
              <input
                type="radio"
                name="gender"
                style={{ height: "15px", width: "15px", marginTop: "10px" }}
                onChange={handleInputChange}
                value="Female"
                className="radio"
                checked={details.gender === "Female"}
              />
              <label style={{ marginLeft: "5px" }}>
                <h5> Female</h5>
              </label>
            </div>
            <div className=" col-sm-4 radio">
              <input
                type="radio"
                name="gender"
                style={{ height: "15px", width: "15px", marginTop: "10px" }}
                onChange={handleInputChange}
                value="Others"
                checked={details.gender === "Others"}
              />
              <label style={{ marginLeft: "5px" }}>
                <h5> Others</h5>
              </label>
            </div>
            {errors.phoneError ? (
              <div className="text-danger" style={{ marginLeft: "125px" }}>
                {errors.genderError}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="form-group row">
            <div className="col-form-label col-sm-2">
              <label>Languages</label>
            </div>
            <div className="col-sm-10 row">
              <Checkbox
                languagesSet={languagesSet}
                handleLanguage={handleLanguage}
                selectedLanguage={details.language}
              />
            </div>
            {errors.langauageError ? (
              <div className="text-danger" style={{ marginLeft: "125px" }}>
                {errors.langauageError}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="form-group row">
            <div className="col-form-label col-sm-2">Country</div>
            <div className="col-sm-8">
              <select
                className="custom-select form-control"
                name="country"
                onChange={handleInputChange}
                value={details.country}
              >
                <option value="">--Choose one---</option>
                <option value="India">India</option>
                <option value="Germany">Germany</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="UK">UK</option>
                <option value="US">US</option>
              </select>
            </div>
            {errors.countryError ? (
              <div className="text-danger" style={{ marginLeft: "125px" }}>
                {errors.countryError}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="text-center">
          <button type="submit" value="submit" className="btn btn-secondary">
            {selectedDetails ? "UPDATE" : "SUBMIT"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DetailsForm;
