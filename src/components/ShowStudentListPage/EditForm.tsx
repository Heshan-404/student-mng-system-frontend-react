import { useEffect, useState } from "react";
import "./EditForm.css";
import axiosInstance from "../../axiosConfig";

export default function EditForm(props: any) {
  const [formVisibility, setFormVisibility] = useState(true);
  function name(props: any) {
    (document.getElementById("inputName") as HTMLInputElement).value =
      props.name;
    (document.getElementById("inputAge") as HTMLInputElement).value = props.age;
    (document.getElementById("inputAddress") as HTMLInputElement).value =
      props.address;
    (document.getElementById("inputGName") as HTMLInputElement).value =
      props.guardianName;
    (document.getElementById("inputGContact") as HTMLInputElement).value =
      props.guardianContactNo;
  }
  useEffect(() => {
    name(props);
  }, [props]);

  function updateStudentDetails() {
    const body = {
      studentId: props.studentId,
      name: (document.getElementById("inputName") as HTMLInputElement).value,
      age: (document.getElementById("inputAge") as HTMLInputElement).value,
      address: (document.getElementById("inputAddress") as HTMLInputElement)
        .value,
      guardianName: (document.getElementById("inputGName") as HTMLInputElement)
        .value,
      guardianContactNo: (
        document.getElementById("inputGContact") as HTMLInputElement
      ).value,
    };
    if (
      props.name != body.name &&
      props.age != body.age &&
      props.address != body.address &&
      props.guardianName != body.guardianName &&
      props.guardianContactNo != body.guardianContactNo
    ) {
      axiosInstance.put<updateResponseBody>("/student", body).then((res) => {
        if (res.data.status == "SUCCESS") {
          alert("Student Updated...");
          location.reload();
        }
      });
    } else {
      axiosInstance.patch<updateResponseBody>("/student", body).then((res) => {
        if (res.data.status == "SUCCESS") {
          alert("Student Updated...");
          location.reload();
        }
      });
    }
  }
  return (
    <div className="form-container p-0 m-0">
      {formVisibility && (
        <div
          tabIndex={-1}
          className="text-center"
          style={{ width: "100vw", height: "100vh", padding: "50px" }}
        >
          <div
            className="container bg-white ps-5 pe-5 text-start"
            style={{ borderRadius: "5px", width: "400px" }}
          >
            <div className="row text-center">
              <label htmlFor="titleForm" className="mXb-2 pt-4 fs-3">
                Edit Student
              </label>
            </div>
            <div className="row">
              <label htmlFor="inputStudentName" className="mb-2">
                Name
              </label>
            </div>
            <div className="row">
              <input type="text" id="inputName" className="form-control mb-3" />
            </div>
            <div className="row">
              <label htmlFor="inputStudentAge" className="pb-2">
                Age
              </label>
            </div>
            <div className="row">
              <input type="text" id="inputAge" className="form-control mb-3" />
            </div>
            <div className="row">
              <label htmlFor="inputStudentAddress" className="pb-2">
                Address
              </label>
            </div>
            <div className="row">
              <input
                type="text"
                id="inputAddress"
                className="form-control mb-3"
              />
            </div>
            <div className="row">
              <label htmlFor="inputGName" className="pb-2">
                G Name
              </label>
            </div>
            <div className="row">
              <input
                type="text"
                id="inputGName"
                className="form-control mb-3"
              />
            </div>
            <div className="row">
              <label htmlFor="inputGContact" className="pb-2">
                G Contact No
              </label>
            </div>
            <div className="row">
              <input
                type="text"
                id="inputGContact"
                className="form-control mb-3"
              />
            </div>
            <div className="row">
              <div className="d-flex">
                <button
                  className="btn btn-primary w-50 m-4"
                  onClick={() => {
                    updateStudentDetails();
                  }}
                >
                  save
                </button>
                <button
                  className="btn btn-secondary w-50 m-4"
                  onClick={() => {
                    setFormVisibility(false);
                  }}
                >
                  cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


interface updateResponseBody{
  status:string;
}