import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CancelIcon from "@mui/icons-material/Cancel";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import NotificationDialog from "../notifications/NotificationDialog";
import axios from "axios";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import deploy from "../../config";

const AddRetailer = (props) => {
  const { addRetailerOpen, setAddRetailerOpen, getData } = props;

  const [inputdata, setInputData] = useState({
    retailer_name: "",
    trigger_link: "",
    target_link: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputdata, [name]: value });
  };

  const [addDataLoading, setAddDataLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [GiftCardData, setGiftCardData] = useState([]);
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

  const handleAddRetailerClose = () => {
    setAddRetailerOpen(false);

    setInputData({
      ...inputdata,
    });
  };

  const submitRetailerData = (e) => {
    e.preventDefault();
    if (status !== "") {
      setAddDataLoading(true);
      // create api call
      let config = {
        method: "POST",
        url: `${deploy.url}/addRetailer`,
        data: { ...inputdata, gift_card: status },
      };
      //axios instance
      axios(config)
        .then((data) => {
          // console.log("checkAddData", data.status, data.data)
          setSuccessMessage("Retailer Added Successfully");
          setFailureMessage("");
          getData();
          handleAddRetailerClose();
        })
        .catch((error) => {
          // console.log("checkAddData error", error.message, error.response.data, typeof (error.response.data.message))
          setSuccessMessage("");
          setFailureMessage("Something went wrong");
        })
        .finally(() => {
          setAddDataLoading(false);
          handleNotificationClickOpen();
        });
    }
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
        open={addRetailerOpen}
        onClose={handleAddRetailerClose}
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
            <div>Add retailer</div>
            <div>
              <CancelIcon
                onClick={handleAddRetailerClose}
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
          <form onSubmit={submitRetailerData}>
            {/* Giftcard Types */}
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
            <Grid item xs={14} style={{ marginBottom: "15px" }}>
              <TextField
                id="outlined-basic"
                label="Retailer"
                variant="outlined"
                fullWidth
                name="retailer_name"
                value={inputdata.retailer_name}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={14} style={{ marginBottom: "15px" }}>
              <TextField
                id="outlined-basic"
                label="Trigger link"
                variant="outlined"
                fullWidth
                multiline
                rows={10}
                name="trigger_link"
                value={inputdata.trigger_link}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={6} style={{ marginBottom: "15px" }}>
              <TextField
                id="outlined-basic"
                label="Target link"
                variant="outlined"
                fullWidth
                name="target_link"
                value={inputdata.target_link}
                onChange={handleChange}
              />
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

export default AddRetailer;
