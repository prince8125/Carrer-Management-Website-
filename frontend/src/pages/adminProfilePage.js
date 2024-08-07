import React, { useContext } from "react";
import { Context } from "../index";
import AdminNavbar from "./adminNavbar";
function AdminProfilePage(){
const {admin}=useContext(Context)
    return(<>
    <AdminNavbar />
    <div style={{display: "flex",justifyContent: "center",alignItems: "center",height: "100vh",backgroundColor:"#FFD7D7"}}>
    <div className="card" style={{backgroundColor:"#CEC9F6"}}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBxyzMRG70nRUwa0InPt6wOJkiSuRQncMstg&usqp=CAU" style={{width: "300px",height: "250px",padding:"10px",marginLeft:"45px"}}></img>
        <h3 style={{marginLeft:"5px"}}>
           Name:{admin.name}
        </h3>
        <h4 style={{marginLeft:"5px",marginRight:"5px"}}>Email:{admin.email}</h4>
        </div>
        </div>
    </>)

}

export default AdminProfilePage