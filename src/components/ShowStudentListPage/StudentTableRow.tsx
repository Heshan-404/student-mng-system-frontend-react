import { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";
import EditForm from "./EditForm";

export default function TableRow(props: any) {
  const [showEditForm, setShowEditForm] = useState(false);
  function deleteStudent(studentId: any) {
    axiosInstance
      .delete<deleteResponse>("/student/".concat(studentId), {})
      .then((response) => {
        if (response.data.status == "SUCCESS") {
          alert("Student Deleted...");
          location.reload();
        } else {
          alert("Failed to Delete...");
        }
      });
  }

  useEffect(() => {}, [showEditForm]);
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.age}</td>
      <td>{props.address}</td>
      <td>{props.guardianName}</td>
      <td>{props.guardianContactNo}</td>
      <td className="d-flex">
        <button
          className=" btn btn-primary  btn-sm me-2 w-50"
          onClick={() => {
            setShowEditForm(true);
          }}
        >
          edit
        </button>
        <button
          className=" btn btn-danger btn-sm me-2 w-50"
          onClick={() => {
            deleteStudent(props.studentId);
          }}
        >
          delete
        </button>
      </td>
      {showEditForm && (
        <EditForm
          studentId={props.studentId}
          name={props.name}
          age={props.age}
          address={props.address}
          guardianName={props.guardianName}
          guardianContactNo={props.guardianContactNo}
        />
      )}
    </tr>
  );
}

interface deleteResponse {
  status: string;
  error: string;
}
