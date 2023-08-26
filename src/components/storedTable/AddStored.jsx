import CancelIcon from "@mui/icons-material/Cancel";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import axios from "axios";
import React, { useState, useEffect } from "react";
import NotificationDialog from "../notifications/NotificationDialog";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import deploy from "../../config";

const AddStored = (props) => {
  const { addStoredOpen, setAddStoredOpen, getData } = props;

  const [inputdata, setInputData] = useState({
    face_value: "",
    date_added: "",
    end_date: "",
    user_id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputdata, [name]: value });
  };

  const [addDataLoading, setAddDataLoading] = useState(false);
  const [GiftCardData, setGiftCardData] = useState([]);
  const [status, setStatus] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [failureMessage, setFailureMessage] = useState("");
  const [notificationOpen, setNotificationOpen] = React.useState(false);

  const handleNotificationClickOpen = () => {
    setNotificationOpen(true);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleNotificationClose = () => {
    setNotificationOpen(false);
    setSuccessMessage("");
    setFailureMessage("");
  };

  const handleAddStoredClose = () => {
    setAddStoredOpen(false);

    setInputData({
      ...inputdata,
    });
  };

  const submitStoredData = (e) => {
    e.preventDefault();
    setAddDataLoading(true);

    // create api call
    let config = {
      method: "POST",
      url: `${deploy.url}/addStored`,
      data: { ...inputdata, gift_card: status },
    };

    axios(config)
      .then((data) => {
        setSuccessMessage("GiftStore Added Successfully");
        getData();
        setFailureMessage("");
        handleAddStoredClose();
      })
      .catch((error) => {
        console.log(
          "checkAddData error",
          error.message,
          error.response.data,
          typeof error.response.data.message
        );
        setSuccessMessage("");
        setFailureMessage("Something went wrong");
      })
      .finally(() => {
        setAddDataLoading(false);
        handleNotificationClickOpen();
      });
  };

  // Get cards Type
  const getCardData = () => {
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
        setGiftCardData(data.data.giftCardTableData);
        setFailureMessage("");
      })
      .catch((error) => {
        setFailureMessage(error.message);
      });
  };
  useEffect(() => {
    getCardData();
  }, []);

  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={addStoredOpen}
        onClose={handleAddStoredClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="customized-dialog-title">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>Add Gift Store</div>
            <div>
              <CancelIcon
                onClick={handleAddStoredClose}
                style={{
                  fontSize: "30px",
                  cursor: "pointer",
                  color: "#3F51B5",
                }}
              />
            </div>
          </div>
        </DialogTitle>
        <DialogContent dividers>
          <form onSubmit={submitStoredData}>
            <Grid container spacing={2}>
              <Grid item xs={14} style={{ marginBottom: "15px" }}>
                <FormControl variant="outlined">
                  <InputLabel id="demo-simple-select-outlined-label">
                    Cards
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={status}
                    onChange={handleStatusChange}
                    label="Status"
                  >
                    {GiftCardData.map((row) => (
                      <MenuItem value={row.gift_card} key={row._id}>
                        {row.gift_card}
                      </MenuItem>
                    ))}
                  </Select>
                  {status === "" && (
                    <div style={{ color: "red" }}>Please select a card</div>
                  )}
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={14} style={{ marginBottom: "15px" }}>
                <TextField
                  id="outlined-basic"
                  label="Enter Face Value"
                  variant="outlined"
                  fullWidth
                  name="face_value"
                  type="number"
                  value={inputdata.face_value}
                  onChange={handleChange}
                  required
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={14} style={{ marginBottom: "15px" }}>
                <TextField
                  id="outlined-basic"
                  label="Date Added"
                  variant="outlined"
                  fullWidth
                  name="date_added"
                  type="date"
                  value={inputdata.date_added}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={14} style={{ marginBottom: "15px" }}>
                <TextField
                  id="outlined-basic"
                  label="Date End"
                  variant="outlined"
                  fullWidth
                  name="end_date"
                  type="date"
                  value={inputdata.end_date}
                  onChange={handleChange}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={14} style={{ marginBottom: "15px" }}>
                <TextField
                  id="outlined-basic"
                  label="User ID"
                  variant="outlined"
                  fullWidth
                  name="user_id"
                  type="string"
                  value={inputdata.user_id}
                  onChange={handleChange}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              {addDataLoading ? (
                <CircularProgress style={{ color: "#fff" }} />
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <NotificationDialog
        notificationOpen={notificationOpen}
        handleNotificationClose={handleNotificationClose}
        successMessage={successMessage}
        failureMessage={failureMessage}
      />
    </div>
  );
};

export default AddStored;
