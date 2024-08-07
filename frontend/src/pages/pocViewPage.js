import React, { useEffect, useState, useContext } from "react";
import UserNavbar from "./userNavbar";
import axios from "axios";
import { Context } from "../index";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function PocViewPage() {
  const { isAuthenticated, loading, user } = useContext(Context);
  const [applied, setApplied] = useState([]);
  const [sid, setSid] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    role: "",
    branch: "",
    salary: 0,
    deadline: "",
    active: false,
  });

  const { id } = useParams(); // Access the ID from the URL
  

  const fetchPost = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/company/com/${id}`, {
        withCredentials: true,
      });
      const { company } = response.data;
      console.log(company);
      setFormData({
        name: company.name,
        description: company.description,
        role: company.role,
        branch: company.branch,
        salary: company.salary,
        deadline: company.deadline,
        active: company.active,
      });
      setSid(company.appliedUsers);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e, id) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/company/update/${id}`,
        formData,
        {
          withCredentials: true,
        }
      );
      toast.success(data.message);
    } catch (err) {
      console.log(err);
    }
  };
  const navigate = useNavigate();
  const handleOpenStudentInfo = (studentId) => {
    navigate(`/pocView/user/${studentId}`);
  };

  return (
    <>
      <UserNavbar />
      <div className="container">
        <h1 className="text-center mt-3"></h1>
        <div className="card m-4">
          <div className="card-body">
            <h5 className="card-title">{formData.name}</h5>
            <form onSubmit={(event) => handleSubmit(event, id)}>
              <div className="mb-2">
                <label htmlFor="description" className="form-label">Description of Company</label>
                <input
                  id="description"
                  className="form-control"
                  placeholder="Description of Company"
                  value={formData.description}
                  onChange={handleChange}
                  name="description"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="role" className="form-label">Role</label>
                <input
                  id="role"
                  className="form-control"
                  placeholder="Role"
                  value={formData.role}
                  onChange={handleChange}
                  name="role"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="salary" className="form-label">Package (per annum)</label>
                <input
                  id="salary"
                  className="form-control"
                  placeholder="Package (per annum)"
                  value={formData.salary}
                  onChange={handleChange}
                  name="salary"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="branch" className="form-label">Branch Requirement</label>
                <input
                  id="branch"
                  className="form-control"
                  placeholder="Branch Requirement"
                  value={formData.branch}
                  onChange={handleChange}
                  name="branch"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="deadline" className="form-label">Deadline</label>
                <input
                  id="deadline"
                  className="form-control"
                  placeholder="Deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  name="deadline"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="active" className="form-label">Active</label>
                <input
                  id="active"
                  className="form-control"
                  placeholder="Active"
                  value={formData.active}
                  onChange={handleChange}
                  name="active"
                />
              </div>
              <button className="btn btn-primary">Update</button>
            </form>
          </div>
        </div>
        {sid.length > 0 && (
          <div className="card m-4">
            <div className="card-body">
              <h5 className="card-title">Applied Students</h5>
              <ul className="list-group">
                {sid.map((studentId) => (
                  <li key={studentId} className="list-group-item">
                    {studentId}
                    <button
                      className="btn btn-link"
                      onClick={() => handleOpenStudentInfo(studentId)}
                    >
                      View Info
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default PocViewPage;
