import axios from "axios";
import React, { useEffect, useState } from "react";
import CollectorTable from "../../components/EditTask/Table/CollectorTask";
import JanitorTable from "../../components/EditTask/Table/JanitorTask";
import Button from "@mui/material/Button";

function EditTaskPage() {
  const [staffs, setStaffs] = useState();
  const [disposals, setDisposals] = useState();
  const [mcps, setMcps] = useState();
  const [vehicles, setVehicles] = useState();
  // eslint-disable-next-line
  const [tableTask, setTableTask] = useState("collector");
  useEffect(() => {
    axios
      .get(`https://63823d929842ca8d3ca4bcfc.mockapi.io/staffs`)
      .then((res) => {
        setStaffs(res.data);
        return axios
          .get(`https://63823d929842ca8d3ca4bcfc.mockapi.io/DisposalFacility`)
          .then((res) => {
            setDisposals(res.data);
            res.data.map((disposal, index) => {
              if (index === 0) setMcps(disposal.Mcps);
              else if (index < res.data.length - 1)
                setMcps((prev) => [...prev, ...disposal.Mcps]);
              return 0;
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));

    axios
      .get("https://63823d929842ca8d3ca4bcfc.mockapi.io/vehicles")
      .then((res) => {
        setVehicles(res.data);
      });
  }, []);

  return (
    <div style={{ position: "relative" }}>
      {tableTask === "collector" ? (
        <>
          <CollectorTable
            staffs={staffs}
            disposals={disposals}
            mcps={mcps}
            vehicles={vehicles}
            rowPerPage={7}
          />
          <Button
            variant="contained"
            sx={{
              position: "absolute",
              margin: "10px",
              zIndex: 10,
              bottom: "2px",
            }}
            onClick={() => setTableTask("janitor")}
          >
            Janitor Task
          </Button>
        </>
      ) : (
        <>
          <JanitorTable
            staffs={staffs}
            disposals={disposals}
            mcps={mcps}
            vehicles={vehicles}
            rowPerPage={7}
          />
          <Button
            variant="contained"
            sx={{
              position: "absolute",
              margin: "10px",
              zIndex: 10,
              bottom: "2px",
            }}
            onClick={() => setTableTask("collector")}
          >
            Collector Task
          </Button>
        </>
      )}
    </div>
  );
}

export default EditTaskPage;
