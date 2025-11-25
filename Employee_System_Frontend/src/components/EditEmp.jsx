import React, { useEffect } from 'react'
import{ useState } from 'react';
import empService from '../service/empservice';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const EditEmp = () => {

  const[emp, setEmp] = useState({
    id:"",
    firstName:"",
    lastName:"",
    email:"",
    address:"",
    salary:""
  });
  const [msg, setMsg]=useState("");

  const data=useParams();
  const navigate=useNavigate();

  useEffect(()=>{
    empService.getEmpById(data.id).then((response)=>{
      setEmp(response.data);
    }).catch((error)=>{
      console.log(error);
    });
  },[]);

  const handleChange = (e) => {
    const value = e.target.value;
    setEmp({ ...emp, [e.target.name]: value });
  };

  const updateEmp = (e) => {
    e.preventDefault();
    empService.updateEmp(emp.id,emp).then((response) => {
     navigate("/"); 
    }).catch((error) => {
        console.log(error);
      });
    
    empService
      .saveEmp(emp)
      .then((response) => {
       setMsg("Employee updated Successfully");
       setEmp({
         firstName:"",
         lastName:"",
         email:"",
         address:"",
         salary:""
       }) 
        
     })
    .catch((error) => {
      console.log(error);
    });
  };

  const resetForm = () => {
  setEmp({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    salary: ""
    });
    setMsg("");
  };


  return (
    <div>
     <div className="container">
       <div className="row">
           <div className="col-md-6 offset-md-3">
              <div className="card">
                <div className="card-header text-center fs-3">Edit Employee
                {msg && <p className="text-success">{msg}</p>}
                </div>
                
                  <div className="card-body">
                    <form onSubmit = {(e)=> updateEmp(e)}>
                      <div className="mb-3">
                        <label>Enter First Name</label>
                        <input type="text" className="form-control" name="firstName" value={emp.firstName} onChange={(e) => handleChange(e)} />
                      </div>

                      <div className="mb-3">
                        <label>Enter Last Name</label>
                        <input type="text" className="form-control" name="lastName" value={emp.lastName} onChange={(e) => handleChange(e)} />
                      </div>

                      <div className="mb-3">
                        <label>Enter Email</label>
                        <input type="text" className="form-control" name="email" value={emp.email} onChange={(e) => handleChange(e)} />
                      </div>

                      <div className="mb-3">
                        <label>Enter Address</label>
                        <input type="text" className="form-control" name="address" value={emp.address} onChange={(e) => handleChange(e)} />
                      </div>

                      <div className="mb-3">
                        <label>Enter Salary</label>
                        <input type="number" className="form-control" name="salary" value={emp.salary} onChange={(e) => handleChange(e)} />
                      </div>

                      <div className="text-center">
                        <button className="btn btn-success" >Submit</button>
                        <button type="button" className="btn btn-danger ms-2" onClick={resetForm}>Reset</button>

                      </div>                      
                    </form>
                  </div>  
              </div>
           </div>
        </div> 
     </div>
    </div>
  )
}

export default EditEmp;
