import React, { useEffect, useState } from "react";
import empservice from '../service/empservice';
import { Link } from "react-router-dom";


const Home = () => {
  const [empList, setEmpList] = useState([]);
  const [msg,setMsg] = useState("");
  useEffect(() => {
    init();
  }, []);

  const init = () => {
    empservice
      .getAllEmp()
      .then((response) => {
        console.log(response.data);
        setEmpList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const deleteEmp = (id) => {
    empservice.deleteEmp(id).then((response) => {
      setMsg("Deleted Successfully");
      setTimeout(() => setMsg(""), 2000);
      init();
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <div className="container">
      <h1 className="text-center mt-4">Employee System</h1>
      {
         msg && <p className="text-center text-success">{msg}</p>
      }
      <table className="table mt-5">
        <thead className="bg-light">
          <tr>
            <th>SL No</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Salary</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {empList.map((emp, index) => (
            <tr key={emp.id}>
              <th scope="row">{index + 1}</th>
              <td>{emp.firstName}</td>
              <td>{emp.lastName}</td>
              <td>{emp.email}</td>
              <td>{emp.address}</td>
              <td>{emp.salary}</td>
              <td>
                <Link to={"editEmp/"+emp.id} className="btn btn-sm btn-primary">Edit</Link>
                <button onClick={() => deleteEmp(emp.id)} className="btn btn-sm btn-danger ms-2">Delete</button>
              </td>
            </tr>
          )
          )
          }
        </tbody>
      </table>
    </div>
  );
};

export default Home;
