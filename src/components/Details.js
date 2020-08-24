import React, { useState, useEffect } from "react";
import DetailsForm from "./DetailsForm";
import ShowDetails from "./ShowDetails";
import axios from "axios";

const Details = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [selectedDetails, setSelectedDetails] = useState(null);

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      const res = await axios.get("http://localhost:4000/details");
      setUserDetails(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/details/${id}`);
      getUserDetails();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (userDetail) => {
    setSelectedDetails(userDetail);
  };

  return (
    <div className="row ">
      <div className="col-sm-6">
        <DetailsForm
          handleRefresh={() => getUserDetails()}
          selectedDetails={selectedDetails}
        />
      </div>

      <div className="col-sm-6 ">
        <ShowDetails
          userDetails={userDetails}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </div>
    </div>
  );
};

export default Details;
