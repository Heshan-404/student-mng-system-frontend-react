import { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";
import TableRow from "./StudentTableRow";
import { Link } from "react-router-dom";

export default function StudentTable() {
  const [renderElement, setRenderElement] = useState(<></>);

  useEffect(() => {
    const fetchData = async () => {
      axiosInstance.get<ResponseType>("/student/all").then((response) => {
        const dataListArray = response.data.data;

        var dataList: any = [];
        for (let index = 0; index < dataListArray.length; index++) {
          const item = dataListArray[index];
          dataList.push(
            <TableRow
              studentId={item["studentId"]}
              name={item["name"]}
              age={item["age"]}
              address={item["address"]}
              guardianName={item["guardianName"]}
              guardianContactNo={item["guardianContactNo"]}
            />
          );
        }

        setRenderElement(dataList);
      });
    };

    fetchData();
  }, []);

  return (
    <div className="container p-5">
      <div className="text-end">
        <Link to={"/student-register"} className="btn btn-success mb-4">
          Register New Student
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th className="col-3" scope="col">Name</th>
            <th className="col-1" scope="col">Age</th>
            <th className="col-2" scope="col">Address</th>
            <th className="col-2" scope="col">Guardian Name</th>
            <th className="col-2" scope="col">Guardian Contact No</th>
            <th className="col-2" scope="col"></th>
          </tr>
        </thead>
        <tbody>{renderElement}</tbody>
      </table>
    </div>
  );
}

interface ResponseType {
  data: any;
}
