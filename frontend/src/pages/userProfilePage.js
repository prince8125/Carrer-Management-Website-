import React, { useContext, useEffect, useState } from "react";
import { Context } from "../index";
import UserNavbar from "./userNavbar";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../styles/userProfilePage.css";

function UserProfilePage() {
  const { user } = useContext(Context);
  const [skills, setSkills] = useState([]);
  const [links, setLinks] = useState([]);
  const [resumeFile, setResumeFile] = useState(null);
  const navigate = useNavigate();

  const fetchSkills = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/skills/all", {
        withCredentials: true,
      });
      setSkills(response.data.skills);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchLinks = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/link/all", {
        withCredentials: true,
      });
      setLinks(response.data.links);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSkills();
    fetchLinks();
  }, []);

  const handleAddSkill = (e) => {
    e.stopPropagation();
    navigate("/userSkill");
  };

  const handleDeleteSkill = async (skillId) => {
    try {
      const { data } = await axios.delete(`http://localhost:4000/api/v1/skills/delete/${skillId}`, {
        withCredentials: true,
      });
      toast.success(data.message);
      fetchSkills();
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const handleAddLink = () => {
    navigate("/userLink");
  };

  const handleDeleteLink = async (linkId) => {
    try {
      const { data } = await axios.delete(`http://localhost:4000/api/v1/link/delete/${linkId}`, {
        withCredentials: true,
      });
      toast.success(data.message);
      fetchLinks();
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const handleResumeUpload = async (e) => {
    e.preventDefault();

    if (!resumeFile) {
      toast.error("Please select a resume file");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resumeFile);

    try {
      const response = await axios.post("http://localhost:4000/api/v1/resume/upload", formData, {
        withCredentials: true,
      });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <UserNavbar />
      <div className="pro_container">
      <div className="upp_card" style={{width: "500px",padding: "5px",border: "5px solid green", backgroundColor: "#A0DAA9" }}>
        <div className="upp_card-body">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOlzk9Jxrwy_wSaWo687HKq5wlByl7UZW-XA&usqp=CAU" style={{width: "300px",height: "250px",padding:"10px"}}></img>
          <h1 className="upp_card-title">Name:{user.name}</h1>
          <h1 className="upp_card-title">Email:{user.email}</h1>
          <h1 className="upp_card-title">Branch:{user.branch}</h1>
          
        </div>
      </div>
  
      <div className="upp_card" style={{width: "1200px",padding: "5px",border: "5px solid green", backgroundColor: "#A0DAA9" }}>
        <div className="upp_card-body">
          <h1 className="upp_card-title">Skills:</h1>
          {skills.map((skill) => {
            if (skill.user === user._id) {
              return (
                <div className="upp_skill-card" style={{backgroundColor:"#EDD59E"}} key={skill._id}>
                  <div className="upp_card-body" style={{backgroundColor:"lightgray"}}>
                    <h5 className="upp_card-title">{skill.name}</h5>
                    <p className="upp_card-text">{skill.description}</p>
                    <p className="upp_card-text">Proficiency: {skill.levelOfProficiency}</p>
                    <p className="upp_card-text">Experience: {skill.yearsOfExperience} years</p>
                    <button className="upp_btn upp_btn-danger upp_float-end" onClick={() => handleDeleteSkill(skill._id)}>
                      Delete Skill
                    </button>
                  </div>
                </div>
              );
            }
            return null;
          })}
          <button className="upp_btn upp_btn-primary" onClick={handleAddSkill}>
            Add Skill
          </button>
        </div>
      </div>

      <div className="upp_card" style={{width: "1200px",padding: "5px",border: "5px solid green", backgroundColor: "#A0DAA9" }}>
        <div className="upp_card-body">
          <h1 className="upp_card-title">Links:</h1>
          {links.map((link) => {
            if (link.user === user._id) {
              return (
                <div className="upp_link-card" key={link._id}>
                  <div className="upp_card-body">
                    <h5 className="upp_card-title">{link.name}</h5>
                    <a href={link.link} className="upp_card-link" target="_blank" rel="noopener noreferrer">
                      {link.link}
                    </a>
                    <button className="upp_btn upp_btn-danger upp_float-end" onClick={() => handleDeleteLink(link._id)}>
                      Delete Link
                    </button>
                  </div>
                </div>
              );
            }
            return null;
          })}
          <button className="upp_btn upp_btn-primary" onClick={handleAddLink}>
            Add Link
          </button>
        </div>
      </div>

      <div className="upp_card"  style={{width: "500px",padding: "5px",border: "5px solid green", backgroundColor: "#A0DAA9" }}>
        <div className="upp_card-body">
          <h1 className="upp_card-title">Resume:</h1>
          <form onSubmit={handleResumeUpload}>
            <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setResumeFile(e.target.files[0])} />
            <button type="submit">Upload Resume</button>
          </form>
        </div>
      </div>
      </div>
    </>
  );
}

export default UserProfilePage;






