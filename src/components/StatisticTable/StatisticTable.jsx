import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TextField, TablePagination } from "@mui/material";

import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import axios from "axios";
import React, { useEffect, useState } from "react";
import deploy from "../../config";
import DeleteStatistc from "./DeleteStatistic";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { useNavigate } from "react-router-dom";

const columns = [
  {
    id: "gift_card",
    label: "Gift Card",
    minwidth: 60,
    align: "center",
    background: "#3277d5",
  },
  {
    id: "date",
    label: "Date Clicked",
    minwidth: 60,
    align: "center",
    background: "#3277d5",
  },
  {
    id: "edit",
    label: "Edit",
    minwidth: 60,
    align: "center",
    background: "#3277d5",
  },
];

const StatisticTable = () => {
  const [value, setValue] = useState(dayjs(new Date()));
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setfilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statisticData, setStatisticData] = useState([]);
  const [noStatisticData, setNoStatisticData] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [deleteStatisticOpen, setDeleteStatisticOpen] = useState(false);
  const [tableRowId, setTableRowId] = useState("");
  const [pg, setpg] = React.useState(0);
  const [rpg, setrpg] = React.useState(5);
  const navigate = useNavigate();

  function handleChangePage(event, newpage) {
    setpg(newpage);
  }

  function handleChangeRowsPerPage(event) {
    setrpg(parseInt(event.target.value, 10));
    setpg(0);
  }

  const getData = () => {
    setLoading(true);
    let config = {
      method: "post",
      url: `${deploy.url}/statisticTable`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        date: value,
      },
    };

    //axios instance
    axios(config)
      .then((data) => {
        if (data.data.statisticData.length === 0) {
          setNoStatisticData(true);
        } else {
          setNoStatisticData(false);
        }
        setStatisticData(data.data.statisticData);
        setfilteredData(data.data.statisticData);
        setErrorStatus(false);
        setErrorMessage("");
      })
      .catch((error) => {
        setErrorStatus(true);
        setErrorMessage(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDeleteStatisticClickOpen = () => {
    setDeleteStatisticOpen(true);
  };

  const handleStatisticClick = (e, id) => {
    setTableRowId(id);
    handleDeleteStatisticClickOpen();
  };

  const onSearch = () => {
    const filteredData = statisticData.filter((statics) =>
      statics.gift_card.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setfilteredData(filteredData);
  };

  useEffect(() => {
    getData();
  }, [value]);

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <div>
        {" "}
        <h1 className="cardName">Statistics</h1>{" "}
      </div>
      <div
        style={{
          width: "95%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextField
            id="standard-basic"
            label="Search"
            variant="standard"
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
          <Button variant="contained" onClick={onSearch}>
            Search
          </Button>
        </div>
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateField", "DateField"]}>
              <DatePicker
                label="Choose the Date"
                value={value}
                onChange={(newValue) => setValue(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
      </div>
      {loading ? (
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <LinearProgress style={{ width: "100%", marginTop: "20px" }} />
        </div>
      ) : errorStatus ? (
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <h4>{errorMessage}</h4>
        </div>
      ) : noStatisticData ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <img src="/imgs/nodata.png" alt="No data"></img>
        </div>
      ) : (
        <div style={{ width: "95%", margin: "auto" }}>
          <Grid container>
            <Grid
              item
              xs={12}
              style={{
                width: "100%",
                overflowX: "auto",
                display: "inline-grid",
                marginTop: "10px",
              }}
            >
              <TableContainer component={Paper}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            minWidth: column.minWidth,
                            background: column.background,
                            color: "#fff",
                          }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredData
                      ?.slice(pg * rpg, pg * rpg + rpg)
                      .map((row) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row._id}
                            style={{
                              background: "#fff",
                              color: "#fff",
                            }}
                          >
                            <TableCell align="center" style={{ color: "#000" }}>
                              {row.gift_card}
                            </TableCell>
                            <TableCell align="center" style={{ color: "#000" }}>
                              {row.date_click}
                            </TableCell>
                            <TableCell align="center" style={{ color: "#000" }}>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <Button
                                  variant="contained"
                                  style={{
                                    backgroundColor: "#fff",
                                    color: "#000",
                                  }}
                                  onClick={(event) =>
                                    handleStatisticClick(event, row._id)
                                  }
                                >
                                  <DeleteIcon />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={statisticData.length}
                rowsPerPage={rpg}
                page={pg}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Grid>
          </Grid>
        </div>
      )}

      {/* delete Statistc dialog */}
      <DeleteStatistc
        deleteStatistcOpen={deleteStatisticOpen}
        setDeleteStatistcOpen={setDeleteStatisticOpen}
        tableRowId={tableRowId}
        getData={getData}
      />
    </div>
  );
};

export default StatisticTable;
