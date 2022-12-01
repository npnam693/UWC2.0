import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import CircleIcon from "@mui/icons-material/Circle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

import axios from "axios";

import styles from "./style.module.css";

const columns = [
  { id: "id", label: "Task ID", minWidth: 80 },
  { id: "user", label: "Staff", minWidth: 180 },
  {
    id: "disposal",
    label: "Disposal Facility",
    minWidth: 140,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "des",
    label: "Description",
    minWidth: 250,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "time",
    label: "Time",
    minWidth: 250,
    align: "left",
    format: (value) => value.toFixed(2),
  },
  {
    id: "status",
    label: "Task Status",
    minWidth: 140,
    align: "left",
    format: (value) => value.toFixed(2),
  },
];

function createData(id, user, disposal, des, time, status) {
  return { id, user, disposal, des, time, status };
}

function CheckBox(param1, param2, checkDefault = false) {
  let hexColor;
  if (param2 <= 50) {
    hexColor = "#0E8F03";
  } else if (param2 > 50 && param2 <= 80) {
    hexColor = "#DB6D07";
  } else {
    hexColor = "#EC0C0C";
  }
  return (
    <div className={styles.checkboxitem}>
      <Checkbox
        value={param1}
        defaultChecked={checkDefault}
        sx={{
          "& .MuiSvgIcon-root": {
            fontSize: 20,
          },
        }}
      ></Checkbox>
      <p style={{ fontSize: "12px", color: "black" }}>
        {param1}
        <span style={{ color: hexColor }}> {param2}%</span>
      </p>
    </div>
  );
}

export default function ColumnGroupingTable({
  staffs,
  disposals,
  // eslint-disable-next-line
  mcps,
  vehicles,
  rowPerPage = 5,
}) {
  const [page, setPage] = useState(0);
  const [collectorTask, setcollectorTask] = useState();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dataEdit, setDataEdit] = useState({});

  const [fac, setFac] = useState("");
  const [stf, setStf] = useState("");
  const [veh, setVeh] = useState("");
  const [des, setDes] = useState("");
  const [dayy, setDayy] = useState(dayjs("2022-04-13"));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    axios
      .get(`https://638265da281f14ffefa75b07.mockapi.io/collector_tasks`)
      .then((res) => {
        setcollectorTask(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  let rows = [];
  if (
    collectorTask !== undefined &&
    staffs !== undefined &&
    disposals !== undefined
  ) {
    rows = collectorTask.map((collectTask) => {
      var _id = "";
      if (collectTask.id.length === 1) _id = "00" + collectTask.id;
      else if (collectTask.id.length === 2) _id = "0" + collectTask.id;
      _id = "CLT" + _id;

      const _user = staffs.find(
        (staff) => staff.id === collectTask.collector_id
      ).name;

      const _disposal = disposals.find(
        (disposal) => disposal.id === collectTask.disposal_id
      ).name;

      const _route = collectTask.route.join("->");

      const _time = Date(collectTask.time).substring(
        0,
        Date(collectTask.time).length - 25
      );

      const _status = collectTask.status;

      return createData(_id, _user, _disposal, _route, _time, _status);
    });
  }

  const printStatus = (status) => {
    if (status === "Success") {
      return (
        <p className={styles.contentRow} style={{ color: "#4AA785" }}>
          <CircleIcon sx={{ fontSize: 7, marginRight: 1 }} />
          Success
        </p>
      );
    } else if (status === "In Progress") {
      return (
        <p className={styles.contentRow} style={{ color: "#8A8CD9" }}>
          <CircleIcon sx={{ fontSize: 7, marginRight: 1 }} />
          In Progress
        </p>
      );
    } else if (status === "Rejected") {
      return (
        <p
          className={styles.contentRow}
          style={{ color: "rgba(0, 0, 0, 0.4)" }}
        >
          <CircleIcon sx={{ fontSize: 7, marginRight: 1 }} />
          Rejected
        </p>
      );
    } else if (status === "Pending") {
      return (
        <p className={styles.contentRow} style={{ color: "#59A8D4" }}>
          <CircleIcon sx={{ fontSize: 7, marginRight: 1 }} />
          Pending
        </p>
      );
    }
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleOpenDialog = (e, data) => {
    setStf(data.user);
    setFac(data.disposal);
    setDes(data.des);
    setDataEdit(data);
    setDialogOpen(true);
  };

  const handleChangeFac = (e) => {
    setFac(e.target.value);
  };
  const handleChangeStaff = (e) => {
    setStf(e.target.value);
  };
  const handleChangeVeh = (e) => {
    setVeh(e.target.value);
  };

  return (
    <Paper
      sx={{
        width: "100%",
        borderRadius: 3,
        marginTop: "15px",
        position: "relative",
      }}
    >
      <TableContainer sx={{ minHeight: 300, borderRadius: 3 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <p className={styles.title}>{column.label} </p>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows
              .slice(page * rowPerPage, page * rowPerPage + rowPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          sx={{ cursor: "pointer" }}
                          onClick={(e) => handleOpenDialog(e, row)}
                        >
                          {column.id === "status" ? (
                            printStatus(value)
                          ) : (
                            <p className={styles.contentRow}>{value}</p>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        backIconButtonProps={<p>ALO</p>}
        rowsPerPage={rowPerPage}
        component="div"
        count={rows.length}
        page={page}
        rowsPerPageOptions={[]}
        onPageChange={handleChangePage}
      ></TablePagination>
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-container": {
            width: "100vw",
            justifyContent: "flex-end",
          },
          "& .MuiPaper-root": {
            width: "calc(100% - 310px)",
            maxWidth: "none",
            marginLeft: "200",
            borderRadius: "12px",
          },
        }}
      >
        <DialogTitle
          sx={{ fontSize: "14px" }}
        >{`Edit task ${dataEdit.id}`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid container>
              <Grid item xs={4} sm={5} md={6} lg={8.5}>
                <div>
                  <InputLabel
                    id="type"
                    sx={{ fontSize: "12px", color: "black" }}
                  >
                    Type
                  </InputLabel>
                  <Input
                    labelId="type"
                    defaultValue="Input type"
                    sx={{
                      border: "1px solid #007AFC",
                      width: "calc(100% - 24px)",
                      padding: "6px 8px",
                      borderRadius: "6px",
                      "&:before": {
                        display: "none",
                      },
                      "&:after": {
                        display: "none",
                      },
                      fontSize: "14px",
                    }}
                  ></Input>
                </div>
                <div style={{ marginTop: "8px" }}>
                  <InputLabel
                    id="fac"
                    sx={{
                      fontSize: "12px",
                      color: "black",
                    }}
                  >
                    Disposal Facility
                  </InputLabel>
                  <Select
                    value={fac}
                    labelId="fac"
                    onChange={handleChangeFac}
                    sx={{
                      fontSize: "14px",
                      width: "calc(100% - 24px)",
                      border: "1px solid #007AFC",
                      borderRadius: "6px",
                      "& .MuiInputBase-root": {
                        border: "none",
                      },
                      "& .MuiSelect-select": {
                        padding: "10px 8px",
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                    }}
                  >
                    {disposals
                      ? disposals.map((e, i) => (
                          <MenuItem
                            key={i}
                            value={e.name}
                            sx={{ fontSize: "14px" }}
                          >
                            {e.name}
                          </MenuItem>
                        ))
                      : null}
                  </Select>
                </div>
                <div style={{ marginTop: "8px" }}>
                  <InputLabel
                    id="route"
                    sx={{
                      fontSize: "12px",
                      color: "black",
                    }}
                  >
                    Route
                  </InputLabel>
                  <Input
                    labelId="route"
                    value={des}
                    sx={{
                      border: "1px solid #007AFC",
                      width: "calc(100% - 24px)",
                      padding: "6px 8px",
                      borderRadius: "6px",
                      "&:before": {
                        display: "none",
                      },
                      "&:after": {
                        display: "none",
                      },
                      fontSize: "14px",
                    }}
                  ></Input>
                  <div className={styles.checkboxroute}>
                    {CheckBox("MCP1", 10, true)}
                    {CheckBox("MCP2", 20, true)}
                    {CheckBox("MCP3", 20, true)}
                    {CheckBox("MCP4", 60, false)}
                    {CheckBox("MCP5", 40, false)}
                    {CheckBox("MCP6", 93, false)}
                    {CheckBox("MCP6", 61, false)}
                  </div>
                </div>
                <div style={{ marginTop: "8px" }}>
                  <InputLabel
                    id="staff"
                    sx={{
                      fontSize: "12px",
                      color: "black",
                    }}
                  >
                    Staff
                  </InputLabel>
                  <Select
                    value={stf}
                    labelId="staff"
                    onChange={handleChangeStaff}
                    sx={{
                      fontSize: "14px",
                      width: "calc(100% - 24px)",
                      border: "1px solid #007AFC",
                      borderRadius: "6px",
                      "& .MuiInputBase-root": {
                        border: "none",
                      },
                      "& .MuiSelect-select": {
                        padding: "10px 8px",
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                    }}
                  >
                    {staffs
                      ? staffs.map((e) => {
                          if (/* e.isCollector */ true)
                            return (
                              <MenuItem
                                key={e.id}
                                value={e.name}
                                sx={{ fontSize: "14px" }}
                              >
                                {e.name}
                              </MenuItem>
                            );
                        })
                      : null}
                  </Select>
                </div>
                <div style={{ marginTop: "8px" }}>
                  <InputLabel
                    id="vehicle"
                    sx={{
                      fontSize: "12px",
                      color: "black",
                    }}
                  >
                    Vehicle
                  </InputLabel>
                  <Select
                    value={veh}
                    labelId="vehicle"
                    onChange={handleChangeVeh}
                    sx={{
                      fontSize: "14px",
                      width: "calc(100% - 24px)",
                      border: "1px solid #007AFC",
                      borderRadius: "6px",
                      "& .MuiInputBase-root": {
                        border: "none",
                      },
                      "& .MuiSelect-select": {
                        padding: "10px 8px",
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                    }}
                  >
                    {vehicles
                      ? vehicles.map((e) => (
                          <MenuItem
                            key={e.id}
                            value={e.name}
                            sx={{ fontSize: "14px" }}
                          >
                            {e.name}
                          </MenuItem>
                        ))
                      : null}
                  </Select>
                </div>
              </Grid>
              <Grid item xs={8} sm={7} md={6} lg={3.5}>
                <div
                  style={{
                    borderRadius: "12px",
                    boxShadow: "0 0 16px -8px #000",
                  }}
                >
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    sx={{ overflow: "hiden" }}
                  >
                    <StaticDatePicker
                      orientation="landscape"
                      openTo="day"
                      value={dayy}
                      onChange={(newValue) => {
                        setDayy(newValue);
                      }}
                      sx={{
                        display: "none",
                      }}
                    />
                  </LocalizationProvider>
                </div>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "flex-start",
            marginLeft: "16px",
            mb: "10px",
          }}
        >
          <Button
            onClick={handleClose}
            sx={{
              fontSize: "16px",
              backgroundColor: "#007AFC",
              color: "white",
              borderRadius: "6px",
              padding: "6px 32px",
              minWidth: "120px",
              transition: "all ease-in-out .25s",
              "&:hover": {
                backgroundColor: "#2d90fa",
              },
            }}
          >
            Save
          </Button>
          <Button
            onClick={handleClose}
            sx={{
              fontSize: "16px",
              backgroundColor: "white",
              border: "1px solid #787777",
              color: "#141414",
              borderRadius: "6px",
              padding: "6px 32px",
              minWidth: "120px",
              transition: "all ease-in-out .25s",
              "&:hover": {
                border: "1px solid #141414",
              },
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
