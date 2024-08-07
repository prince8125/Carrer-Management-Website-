import React, { useEffect, useState, useContext } from "react";
import AdminNavbar from "./adminNavbar";
import axios from "axios";
import { Context } from "../index";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function AdminHomePageMain() {
  const [posts, setPosts] = useState([]);
  const { isAuthenticated, loading, user,admin } = useContext(Context);

  const fetchPost = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/company/all", {
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
    navigate(`/admin/company/${companyId}`);
  };

  
  
    return (
      <>
        <AdminNavbar />
        <div className="container">
          <h1 className="text-center mt-3">
            Hello {admin.name}
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
   
}

export default AdminHomePageMain;

