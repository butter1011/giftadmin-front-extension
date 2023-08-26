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
import { TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DeleteStored from "./DeleteStored";
import EditStored from "./EditStored";
import AddStored from "./AddStored";
import deploy from "../../config";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { TablePagination } from "@mui/material";
import { useNavigate } from "react-router-dom";

const columns = [
  {
    id: "_id",
    label: "ID",
    minwidth: 60,
    align: "center",
    background: "#3277d5",
  },
  {
    id: "gift_card",
    label: "Gift card",
    minwidth: 60,
    align: "center",
    background: "#3277d5",
  },
  {
    id: "face_value",
    label: "Face value",
    minwidth: 60,
    align: "center",
    background: "#3277d5",
  },

  {
    id: "date_added",
    label: "Date added",
    minwidth: 60,
    align: "center",
    background: "#3277d5",
  },
  {
    id: "end_date",
    label: "End date",
    minwidth: 60,
    align: "center",
    background: "#3277d5",
  },
  {
    id: "user_id",
    label: "User ID",
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

const StoredTable = () => {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setfilteredData] = useState([]);
  const [storedData, setStoredData] = useState([]);
  const [noStoredData, setNoStoredData] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [addStoredOpen, setAddStoredOpen] = React.useState(false);
  const [editStoredopen, setEditStoredOpen] = React.useState(false);
  const [deleteStoredOpen, setDeleteStoredOpen] = useState(false);
  const [tableRowId, setTableRowId] = useState("");
  const navigate = useNavigate();

  const [pg, setpg] = React.useState(0);
  const [rpg, setrpg] = React.useState(5);

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
      method: "get",
      url: `${deploy.url}/storedTable`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    //axios instance
    axios(config)
      .then((data) => {
        if (data.data.storedTableData.length === 0) {
          setNoStoredData(true);
        } else {
          setNoStoredData(false);
        }
        setStoredData(data.data.storedTableData);
        setfilteredData(data.data.storedTableData);
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

  const handleAddStoredClickOpen = () => {
    setAddStoredOpen(true);
  };

  const handleEditStoredClickOpen = () => {
    setEditStoredOpen(true);
  };

  const handleDeleteStoredOpen = () => {
    setDeleteStoredOpen(true);
  };

  const handleStoredClick = (e, id) => {
    setTableRowId(id);
    handleEditStoredClickOpen();
  };

  const handleDeleteClick = (e, id) => {
    setTableRowId(id);
    handleDeleteStoredOpen();
  };

  const onSearch = () => {
    const filteredData = storedData.filter((stored) =>
      stored.gift_card.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setfilteredData(filteredData);
  };

  useEffect(() => {
    getData();
  }, []);

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
        <h1 className="cardName">Giftcards stored</h1>{" "}
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
          <Button variant="contained" onClick={onSearch}>Search</Button>
        </div>
        <div>
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={() => handleAddStoredClickOpen()}
          >
            Add Gift Store
          </Button>
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
      ) : noStoredData ? (
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
                            }}
                          >
                            <TableCell align="center" style={{ color: "#000" }}>
                              {row._id}
                            </TableCell>
                            <TableCell align="center" style={{ color: "#000" }}>
                              {row.gift_card}
                            </TableCell>
                            <TableCell align="center" style={{ color: "#000" }}>
                              {row.face_value}
                            </TableCell>
                            <TableCell align="center" style={{ color: "#000" }}>
                              {row.date_added}
                            </TableCell>
                            <TableCell align="center" style={{ color: "#000" }}>
                              {row.end_date}
                            </TableCell>
                            <TableCell align="center" style={{ color: "#000" }}>
                              {row.user_id}
                            </TableCell>
                            {/* <TableCell align="center">
                            {new Date(row.date_updated).toLocaleDateString(
                              "en-US"
                            )}
                          </TableCell> */}
                            <TableCell align="center" style={{ color: "#000" }}>
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
                                    handleStoredClick(event, row._id)
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
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={storedData.length}
                rowsPerPage={rpg}
                page={pg}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Grid>
          </Grid>
        </div>
      )}

      {/* add employee dialog */}
      <AddStored
        addStoredOpen={addStoredOpen}
        setAddStoredOpen={setAddStoredOpen}
        getData={getData}
      />

      {/* edit employee dialog */}
      <EditStored
        editStoredopen={editStoredopen}
        setEditStoredOpen={setEditStoredOpen}
        tableRowId={tableRowId}
        getData={getData}
      />

      {/* delete employee dialog */}
      <DeleteStored
        deleteStoredOpen={deleteStoredOpen}
        setDeleteStoredOpen={setDeleteStoredOpen}
        tableRowId={tableRowId}
        getData={getData}
      />
    </div>
  );
};

export default StoredTable;
