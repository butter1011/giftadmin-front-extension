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
import { Typography, TextField, TablePagination } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AddGiftCard from "./AddGiftCard";
import EditEmployee from "./EditGiftCard";
import DeleteEmployee from "./DeleteGiftCard";
import deploy from "../../config";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

const columns = [
  {
    id: "gift_card",
    label: "Gift Card",
    minwidth: 60,
    align: "center",
    background: "#3277d5",
  },
  {
    id: "_id",
    label: "ID",
    minwidth: 60,
    align: "center",
    background: "#3277d5",
  },

  {
    id: "image_url",
    label: "Image",
    minwidth: 60,
    align: "center",
    background: "#3277d5",
  },
  {
    id: "target_url",
    label: "Target URL",
    minwidth: 60,
    align: "center",
    background: "#3277d5",
  },
  {
    id: "trigger_link",
    label: "Trigger Link",
    minwidth: 60,
    align: "center",
    background: "#3277d5",
  },
  {
    id: "wallet",
    label: "Total in Wallet",
    minwidth: 60,
    align: "center",
    background: "#3277d5",
  },
  {
    id: "click",
    label: "Total Clicks",
    minwidth: 5,
    align: "center",
    background: "#3277d5",
  },
  {
    id: "date",
    label: "Date modified",
    minwidth: 60,
    align: "center",
    background: "#3277d5",
  },
  {
    id: "author",
    label: "Author",
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

const GiftCardTable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [employeesData, setEmployeesData] = useState([]);
  const [filteredData, setfilteredData] = useState([]);
  const [noEmlployeeData, setNoEmployeeData] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [addGiftCardOpen, setAddGiftCardOpen] = React.useState(false);
  const [editEmployeeopen, setEditEmployeeOpen] = React.useState(false);
  const [deleteEmployeeOpen, setDeleteEmployeeOpen] = useState(false);
  const [tableRowId, setTableRowId] = useState("");

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
      url: `${deploy.url}/GiftcardTable`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    //axios instance
    axios(config)
      .then((data) => {
        if (data.data.giftCardTableData.length === 0) {
          setNoEmployeeData(true);
        } else {
          setNoEmployeeData(false);
        }
        setEmployeesData(data.data.giftCardTableData);
        setfilteredData(data.data.giftCardTableData);
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

  const handleAddGiftCardClickOpen = () => {
    setAddGiftCardOpen(true);
  };

  const handleEditEmployeeClickOpen = () => {
    setEditEmployeeOpen(true);
  };

  const handleDeleteEmployeeClickOpen = () => {
    setDeleteEmployeeOpen(true);
  };

  const handleEditClick = (e, id) => {
    setTableRowId(id);
    handleEditEmployeeClickOpen();
  };

  const handleDeleteClick = (e, id) => {
    setTableRowId(id);
    handleDeleteEmployeeClickOpen();
  };

  useEffect(() => {
    getData();
  }, []);

  const onSearch = () => {
    const filteredData = employeesData.filter((employee) =>
      employee.gift_card.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setfilteredData(filteredData);
  };

  return (
    <div>
      <div>
        {" "}
        <h1 className="cardName">Gift Cards</h1>{" "}
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
          <Button
            size="large"
            variant="contained"
            onClick={() => handleAddGiftCardClickOpen()}
          >
            Add Gift Card
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
      ) : noEmlployeeData ? (
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
                              {row.gift_card}
                            </TableCell>
                            <TableCell align="center" style={{ color: "#000" }}>
                              {row._id}
                            </TableCell>
                            <TableCell align="center" style={{ color: "#000" }}>
                              {row.image_url}
                            </TableCell>

                            <TableCell align="center" style={{ color: "#000" }}>
                              {row.target_url}
                            </TableCell>

                            <TableCell align="center" style={{ color: "#000" }}>
                              {row.trigger_link
                                ?.slice(0, 3)
                                .map((line, index) => (
                                  <Typography variant="body1" key={index}>
                                    {line.trim()}
                                  </Typography>
                                ))}
                            </TableCell>

                            <TableCell align="center" style={{ color: "#000" }}>
                              {row.total_wallet}
                            </TableCell>
                            <TableCell align="center" style={{ color: "#000" }}>
                              {row.total_clicks}
                            </TableCell>
                            <TableCell align="center" style={{ color: "#000" }}>
                              {new Date(row.date_updated).toLocaleDateString(
                                "en-US"
                              )}
                            </TableCell>
                            <TableCell align="center" style={{ color: "#000" }}>
                              {row.author}
                            </TableCell>
                            <TableCell align="center">
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
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={employeesData.length}
                rowsPerPage={rpg}
                page={pg}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Grid>
          </Grid>
        </div>
      )}

      {/* add Gift Card dialog */}
      <AddGiftCard
        addGiftCardOpen={addGiftCardOpen}
        setAddGiftCardOpen={setAddGiftCardOpen}
        getData={getData}
      />

      {/* edit Gfit Card dialog */}
      <EditEmployee
        editEmployeeopen={editEmployeeopen}
        setEditEmployeeOpen={setEditEmployeeOpen}
        tableRowId={tableRowId}
        getData={getData}
      />

      {/* delete employee dialog */}
      <DeleteEmployee
        deleteEmployeeOpen={deleteEmployeeOpen}
        setDeleteEmployeeOpen={setDeleteEmployeeOpen}
        tableRowId={tableRowId}
        getData={getData}
      />
    </div>
  );
};

export default GiftCardTable;
