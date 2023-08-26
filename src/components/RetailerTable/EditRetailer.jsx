import React, { useEffect, useState } from "react";
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
import deploy from "../../config";

const EditRetailer = (props) => {
  const { editCompanyopen, setEditCompanyOpen, tableRowId, getData } = props;

  const [inputdata, setInputData] = useState({
    retailer_name: "",
    gift_id: "",
    trigger_link: "",
    target_url: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputdata, [name]: value });
  };

  const [EditDataLoading, setEditDataLoading] = useState(false);

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

  const handleEditComapnyClose = () => {
    setEditCompanyOpen(false);

    setInputData({
      ...inputdata,
      retailer_name: "",
      gift_id: "",
      trigger_link: "",
      target_url: "",
    });
  };
  const submitCompanyData = (e) => {
    e.preventDefault();
    setEditDataLoading(true);
    // update api call
    let config = {
      method: "patch",
      url: `${deploy.url}/updateRetailerDetails/${tableRowId}`,
      data: inputdata,
    };
    //axios instance
    axios(config)
      .then((data) => {
        // console.log("checkAddData", data.status, data.data)
        setSuccessMessage("Retailer Edited Successfully");
        getData();
        setFailureMessage("");
        // get call
        handleEditComapnyClose();
      })
      .catch((error) => {
        // console.log("checkAddData error", error.message, error.response.data, typeof (error.response.data.message))
        setSuccessMessage("");
        setFailureMessage("Something went wrong");
      })
      .finally(() => {
        setEditDataLoading(false);
        handleNotificationClickOpen();
      });
  };

  useEffect(() => {
    axios
      .get(`${deploy.url}/retailerTable/${tableRowId}`)
      .then((data) => {
        setInputData(data.data);
      })
      .catch((error) => {});
  }, [tableRowId]);

  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={editCompanyopen}
        onClose={handleEditComapnyClose}
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
            <div>Edit Retailer</div>
            <div>
              <CancelIcon
                onClick={handleEditComapnyClose}
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
          <form onSubmit={submitCompanyData}>
            <Grid container spacing={2}>
              <Grid item xs={14} style={{ marginBottom: "15px" }}>
                <TextField
                  id="outlined-basic"
                  label="Trigger Link"
                  variant="outlined"
                  fullWidth
                  name="trigger_link"
                  value={inputdata.trigger_link}
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
                  label="Id"
                  variant="outlined"
                  fullWidth
                  name="_id"
                  value={inputdata._id}
                  disabled
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
                  label="Retailer"
                  variant="outlined"
                  fullWidth
                  name="retailer_name"
                  value={inputdata.retailer_name}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={14} style={{ marginBottom: "15px" }}>
                <TextField
                  id="outlined-basic"
                  label="Target Link"
                  variant="outlined"
                  fullWidth
                  name="target_link"
                  value={inputdata.target_link}
                  onChange={handleChange}
                  required
                />
              </Grid>
            </Grid>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              {EditDataLoading ? (
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

export default EditRetailer;
