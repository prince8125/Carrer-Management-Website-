import React, { useState, useEffect, useContext } from "react";
import { Context } from "../index";
import axios from "axios";
import UserNavbar from "./userNavbar";
import "../styles/userAppliedCompanies.css";


function UserAppliedCompanies() {
  const [posts, setPosts] = useState([]);
  const { isAuthenticated, user } = useContext(Context);

  const fetchPost = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/v1/company/all", {
        withCredentials: true,
      });

      const filteredCompanies = data.result.filter((company) =>
        company.appliedUsers.includes(user._id)
      );
      setPosts(filteredCompanies);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [posts]);

  return (
    <>
      <UserNavbar />
      <div className="user-applied-companies-container" style={{ backgroundImage: 'url("https://img.freepik.com/free-vector/network-mesh-wire-digital-technology-background_1017-27428.jpg?size=626&ext=jpg")' }}>

        <div className="container">
          <h1 className="text-center mt-3 uac_heading">Hello {user.name}, here are the companies you've applied to:</h1>
          <div className="card-deck mt-5">
            {posts.map((company) => (
              <div className="card uac_company-card" key={company._id}>
                <div className="card-body">
                  <h4 className="card-title uac_company-name">{company.name}</h4>
                  <p className="card-text uac_company-description">{company.description}</p>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item uac_company-info"><strong>Role:</strong> {company.role}</li>
                    <li className="list-group-item uac_company-info"><strong>Salary:</strong> {company.salary}</li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserAppliedCompanies;
