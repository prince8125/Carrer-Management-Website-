import React, { useState, useContext } from "react";
import UserNavbar from "./userNavbar";
import { toast } from "react-hot-toast";
import { Context } from "../index.js";
import axios from "axios";

function AddSkillPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [proficiency, setProficiency] = useState(0);
  const [yearsOfExperience, setYearsOfExperience] = useState(0);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/skills/new",
        {
          user: user._id,
          name: name,
          description: description,
          levelOfProficiency: proficiency,
          yearsOfExperience: yearsOfExperience,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setName("");
      setDescription("");
      setProficiency(0);
      setYearsOfExperience(0);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <UserNavbar />
      <div style={{backgroundColor:"#dde8cb"}}>
      <div className="container" >
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="proficiency" className="form-label">
              Proficiency
            </label>
            <input
              type="range"
              className="form-range"
              id="proficiency"
              name="proficiency"
              value={proficiency}
              onChange={(e) => setProficiency(Number(e.target.value))}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="experience" className="form-label">
              Years of Experience
            </label>
            <input
              type="number"
              className="form-control"
              id="experience"
              name="experience"
              value={yearsOfExperience}
              onChange={(e) => setYearsOfExperience(Number(e.target.value))}
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{marginBottom:"50px",marginTop:"20px"}}>
            Submit
          </button>
        </form>
      </div>
      </div>
    </>
  );
}

export default AddSkillPage;
