import React, { useEffect, useState, useContext } from "react";
import UserNavbar from "./userNavbar";
import axios from "axios";
import { Context } from "../index";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function PocViewPageMain() {
  const [posts, setPosts] = useState([]);
  const { isAuthenticated, loading, user } = useContext(Context);

  const fetchPost = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/poc/all", {
        withCredentials: true,
      });
      setPosts(response.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const navigate = useNavigate();

  const handleOpenCompanyDetails = (companyId) => {
    navigate(`/pocView/company/${companyId}`);
  };

  
  if (posts && posts.length > 0) {
    return (
      <>
        <UserNavbar />
        <div className="container">
          <h1 className="text-center mt-3">
            Hello {user.name}, here are the companies you are POC for:
          </h1>
          <div className="card-deck mt-5">
            {posts.map((company) => (
              <div key={company._id} className="card m-4">
                <div className="card-body">
                  <h5 className="card-title">{company.name}</h5>
                  <p className="card-text">{company.description}</p>
                  <ul className="list-group">
                    <li className="list-group-item">
                      <strong>Role:</strong> {company.role}
                    </li>
                    <li className="list-group-item">
                      <strong>Branch:</strong> {company.branch}
                    </li>
                    <li className="list-group-item">
                      <strong>Salary:</strong> {company.salary}
                    </li>
                    <li className="list-group-item">
                      <strong>Deadline:</strong>{" "}
                      {new Date(company.timeline).toLocaleDateString()}
                    </li>
                    <li className="list-group-item">
                      <strong>Active:</strong>{" "}
                      {company.active ? "Yes" : "No"}
                    </li>
                  </ul>
                  
                  <button
                    className="btn btn-primary mt-3"
                    onClick={() => handleOpenCompanyDetails(company._id)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <UserNavbar />
        <h1 className="text-center mt-3">You are not POC for any company</h1>
      </>
    );
  }
}

export default PocViewPageMain;

