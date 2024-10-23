import { Link } from "react-router-dom";
import axiosInstance from "../../axiosConfig";
import "./RegisterForm.css";
export default function RegisterForm() {
  function isEmptyOrNull(value: any) {
    return value == "" || value == null || value == undefined;
  }
  async function handleStudentRegisterFormSubmit() {
    const studentName = (
      document.getElementById("studentName") as HTMLInputElement
    ).value;
    const studentAge = (
      document.getElementById("studentAge") as HTMLInputElement
    ).value;
    const studentAddress = (
      document.getElementById("studentAddress") as HTMLInputElement
    ).value;
    const studentGName = (
      document.getElementById("studentGName") as HTMLInputElement
    ).value;
    const studentGContactNo = (
      document.getElementById("studentGContactNo") as HTMLInputElement
    ).value;

    const body = {
      name: studentName,
      age: studentAge,
      address: studentAddress,
      guardianName: studentGName,
      guardianContactNo: studentGContactNo,
    };

    if (
      isEmptyOrNull(studentName) ||
      isEmptyOrNull(studentAge) ||
      isEmptyOrNull(studentAddress) ||
      isEmptyOrNull(studentGName) ||
      isEmptyOrNull(studentGContactNo)
    ) {
      alert("First fill all fileds");
      return;
    }

    const response = await axiosInstance.post<studentRegisterResponse>(
      "/student",
      body
    );
    const data = response.data;
    if (data.status == "FAILED") {
      alert(data.error);
    } else if (data.status == "SUCCESS") {
      alert("Student Registered");

      location.reload();
    }
  }
  return (
    <div>
      <div className="text-start pt-3 ps-3">
        <Link to={"/all-students"} className="btn btn-success mb-4">
          Back
        </Link>
      </div>
      <div className="container">
        <div className="row ">
          <div className="col-6 align-content-center">
            <div className="p-5">
              <label className="form-label" htmlFor="studentName">
                Name
              </label>
              <input type="text" className="form-control" id="studentName" />
              <label className="form-label" htmlFor="studentAge">
                Age
              </label>
              <input type="text" id="studentAge" className="form-control" />
              <label className="form-label" htmlFor="studentAddress">
                Address
              </label>
              <input type="text" id="studentAddress" className="form-control" />
              <label className="form-label" htmlFor="studentGName">
                Guardian Name
              </label>
              <input type="text" id="studentGName" className="form-control" />
              <label className="form-label" htmlFor="studentGContactNo">
                Guardian Contact No
              </label>
              <input
                type="text"
                id="studentGContactNo"
                className="form-control"
              />
              <div className="text-center">
                <button
                  onClick={handleStudentRegisterFormSubmit}
                  className="btn btn-success mt-3 w-50 "
                >
                  Register
                </button>
              </div>
            </div>
          </div>
          <div className="col-6"></div>
        </div>
      </div>
    </div>
  );
}

interface studentRegisterResponse {
  data: any;
  status: string;
  error: string;
}
