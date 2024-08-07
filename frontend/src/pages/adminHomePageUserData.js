import React, { useEffect, useState } from "react";
import AdminNavbar from "./adminNavbar";
import axios from "axios";
import { useParams } from "react-router-dom";

function AdminHomePageUserData() {
  const { id } = useParams();

  const [skills, setSkills] = useState([]);
  const [links, setLinks] = useState([]);
  const [data, setData] = useState({});
  const [resume, setResume] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/users/${id}`, {
        withCredentials: true,
      });
      setData(response.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSkills = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/skills/all/${id}`, {
        withCredentials: true,
      });
      setSkills(response.data.skills);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchLinks = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/link/all/${id}`, {
        withCredentials: true,
      });
      setLinks(response.data.links);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchResume = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/resume/${id}`, {
        withCredentials: true,
      });
      setResume(response.data.path);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchSkills();
    fetchLinks();
    fetchResume();
  }, []);

  const handleDownloadResume = async () => {
    try {
      const downloadUrl = `http://localhost:4000/api/v1/resume/download/${id}`;
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", "resume.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="container">
        <h1 className="text-center mt-3">User Data</h1>
        <div className="card m-4">
          <div className="card-body">
            <h5 className="card-title">{data.name}</h5>
            <p className="card-text">Email: {data.email}</p>
            <p className="card-text">Branch: {data.branch}</p>
          </div>
        </div>
        <div className="card m-4">
          <div className="card-body">
            <h5 className="card-title">Skills</h5>
            <ul className="list-group">
              {skills.map((skill) => (
                <li key={skill._id} className="list-group-item">
                  Name: {skill.name}
                  <br />
                  Description: {skill.description}
                  <br />
                  Level of Proficiency: {skill.levelOfProficiency}
                  <br />
                  Years of Experience: {skill.yearsOfExperience}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="card m-4">
          <div className="card-body">
            <h5 className="card-title">Links</h5>
            <ul className="list-group">
              {links.map((link) => (
                <li key={link._id} className="list-group-item">
                  <a href={link.link} target="_blank" rel="noopener noreferrer">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {resume && (
          <div className="card m-4">
            <div className="card-body">
              <h5 className="card-title">Resume</h5>
              <button className="btn btn-primary" onClick={handleDownloadResume}>
                Download Resume
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AdminHomePageUserData;