import React from "react";

export const ShowDetails = ({ userDetails, handleDelete, handleEdit }) => {
  return (
    <div>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>PHONE NO.</th>
            <th>GENDER</th>
            <th>SKILLS</th>
            <th>COUNTRY</th>
            <th>ACTIONS</th>
          </tr>
          {userDetails.map((userDetail) => {
            return (
              <tr key={userDetail.id} className="">
                <td>{userDetail.name}</td>
                <td>{userDetail.email}</td>
                <td>{userDetail.phone}</td>
                <td>{userDetail.gender}</td>
                <td>{`${userDetail.language}`}</td>
                <td>{userDetail.country}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(userDetail)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(userDetail.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </thead>
      </table>
    </div>
  );
};

export default ShowDetails;
