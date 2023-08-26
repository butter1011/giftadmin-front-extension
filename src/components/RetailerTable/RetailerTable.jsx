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
import axios from "axios";
import React, { useEffect, useState } from "react";
import DeleteComapny from "./DeleteReailer";
import EditRetailer from "./EditRetailer";
// import AddRetailer from "./AddRetailer";
import deploy from "../../config";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { useNavigate } from "react-router-dom";

const columns = [
  {
    id: "retailer",
    label: "Retailer",
    minwidth: 60,
    align: "center",
    background: "#3277d5",
  },
  {
    id: "id",
    label: "ID",
    minwidth: 60,
    align: "center",
    background: "#3277d5",
  },

  {
    id: "trigger_link",
    label: "Trigger link",
    minwidth: 60,
    align: "center",
    background: "#3277d5",
  },
  {
    id: "target_link",
    label: "Target link",
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

const RetailerTable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setfilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [RetailerData, setretailerData] = useState([]);
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // const [addRetailerOpen, setAddRetailerOpen] = React.useState(false);
  const [editCompanyopen, setEditCompanyOpen] = React.useState(false);
  const [deleteComapnyOpen, setDeleteCompanyOpen] = useState(false);
  const [tableRowId, setTableRowId] = useState("");
  const [pg, setpg] = React.useState(0);
  const [rpg, setrpg] = React.useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/");
    }
  }, []);
  function handleChangePage(event, newpage) {
    setpg(newpage);
  }

  function handleChangeRowsPerPage(event) {
    setrpg(parseInt(event.target.value, 10));
    setpg(0);
  }
  //get retailerData
  const getData = () => {
    setLoading(true);
    let config = {
      method: "get",
      url: `${deploy.url}/retailerTable`,
      headers: {
        "Content-Type": "application/json",
      },
    };
    //axios instance
    axios(config)
      .then((data) => {
        setretailerData(data.data.retailerTableData);
        setfilteredData(data.data.retailerTableData);
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

  // const handleAddRetailerClickOpen = () => {
  //   setAddRetailerOpen(true);
  // };

  const handleEditComapnyClickOpen = () => {
    setEditCompanyOpen(true);
  };

  const handleDeleteCompanyClickOpen = () => {
    setDeleteCompanyOpen(true);
  };

  const handleEditClick = (e, id, link) => {
    setTableRowId(id);
    handleEditComapnyClickOpen();
  };

  const handleDeleteClick = (e, id) => {
    setTableRowId(id);
    handleDeleteCompanyClickOpen();
  };

  const onSearch = () => {
    const filteredData = RetailerData.filter((retalier) =>
      retalier.trigger_link.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setfilteredData(filteredData);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div>
        {" "}
        <h1 className="cardName">Retailers Table</h1>{" "}
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

        {/* add retailer */}
        {/* <div>
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={() => handleAddRetailerClickOpen()}
          >
            Add retailer
          </Button>
        </div> */}
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
      ) : !RetailerData ? (
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
                          <React.Fragment key={row._id}>
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              style={{
                                background: "#fff",
                                color: "#000",
                              }}
                            >
                              <TableCell
                                align="center"
                                style={{ color: "#000" }}
                              >
                                {row.retailer_name}
                              </TableCell>
                              <TableCell
                                align="center"
                                style={{ color: "#000" }}
                              >
                                {row._id}
                              </TableCell>
                              <TableCell
                                align="center"
                                style={{ color: "#000" }}
                              >
                                {row.trigger_link}
                              </TableCell>
                              <TableCell
                                align="center"
                                style={{ color: "#000" }}
                              >
                                {row.target_link}
                              </TableCell>
                              <TableCell
                                align="center"
                                style={{ color: "#000" }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <Button
                                    variant="contained"
                                    style={{
                                      backgroundColor: "#fff",
                                      color: "#000",
                                    }}
                                    onClick={(event) =>
                                      handleEditClick(event, row._id)
                                    }
                                  >
                                    <EditIcon />
                                  </Button>
                                  <Button
                                    variant="contained"
                                    style={{
                                      backgroundColor: "#fff",
                                      color: "#000",
                                    }}
                                    onClick={(event) =>
                                      handleDeleteClick(event, row._id)
                                    }
                                  >
                                    <DeleteIcon />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          </React.Fragment>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={RetailerData.length}
                rowsPerPage={rpg}
                page={pg}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Grid>
          </Grid>
        </div>
      )}

      {/* add retailer dialog */}
      {/* <AddRetailer
        addRetailerOpen={addRetailerOpen}
        setAddRetailerOpen={setAddRetailerOpen}
        getData={getData}
      /> */}

      {/* edit company dialog */}
      <EditRetailer
        editCompanyopen={editCompanyopen}
        setEditCompanyOpen={setEditCompanyOpen}
        tableRowId={tableRowId}
        getData={getData}
      />

      {/* delete company dialog */}
      <DeleteComapny
        deleteComapnyOpen={deleteComapnyOpen}
        setDeleteCompanyOpen={setDeleteCompanyOpen}
        tableRowId={tableRowId}
        getData={getData}
      />
    </div>
  );
};

export default RetailerTable;
