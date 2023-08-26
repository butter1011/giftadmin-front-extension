import CancelIcon from "@mui/icons-material/Cancel";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import axios from "axios";
import React, { useState } from "react";
import NotificationDialog from "../notifications/NotificationDialog";
import deploy from "../../config";

const AddGiftCard = (props) => {
  const { addGiftCardOpen, setAddGiftCardOpen, getData } = props;

  const [inputdata, setInputData] = useState({
    gift_card: "",
    image_url: "",
    target_url: "",
    total_wallet: 0,
    trigger_link: "",
    author: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputdata, [name]: value });
  };

  const [addDataLoading, setAddDataLoading] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [failureMessage, setFailureMessage] = useState("");
  const [notificationOpen, setNotificationOpen] = React.useState(false);

  const handleNotificationClickOpen = () => {
    setNotificationOpen(true);
  };

  const handleNotificationClose = () => {
    setNotificationOpen(false);
    setSuccessMessage("");
    setFailureMessage("");
  };

  const handleAddEmployeeClose = () => {
    setAddGiftCardOpen(false);

    setInputData({
      ...inputdata,
    });
  };

  const submitEmployeeData = (e) => {
    e.preventDefault();
    setAddDataLoading(true);

    // create api call
    let config = {
      method: "POST",
      url: `${deploy.url}/addGiftcard`,
      data: inputdata,
    };
    //axios instance
    axios(config)
      .then((data) => {
        setSuccessMessage("GiftCard Added Successfully");
        setFailureMessage("");
        getData();
        handleAddEmployeeClose();
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

  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={addGiftCardOpen}
        onClose={handleAddEmployeeClose}
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
            <div>Add Gift Card</div>
            <div>
              <CancelIcon
                onClick={handleAddEmployeeClose}
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
          <form onSubmit={submitEmployeeData}>
            <Grid container spacing={2}>
              <Grid item xs={14} style={{ marginBottom: "15px" }}>
                <TextField
                  id="outlined-basic"
                  label="Enter Gift Card"
                  variant="outlined"
                  fullWidth
                  name="gift_card"
                  value={inputdata.gift_card}
                  onChange={handleChange}
                  required
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={14} style={{ marginBottom: "15px" }}>
                <TextField
                  id="outlined-basic"
                  label="Enter Image URL"
                  variant="outlined"
                  fullWidth
                  name="image_url"
                  type="image_url"
                  value={inputdata.image_url}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={14} style={{ marginBottom: "15px" }}>
                <TextField
                  id="outlined-basic"
                  label="Enter Target URL"
                  variant="outlined"
                  fullWidth
                  name="target_url"
                  value={inputdata.target_url}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={14} style={{ marginBottom: "15px" }}>
                <TextField
                  id="outlined-basic"
                  label="Enter Author"
                  variant="outlined"
                  fullWidth
                  name="author"
                  value={inputdata.author}
                  onChange={handleChange}
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

export default AddGiftCard;
