import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CancelIcon from "@mui/icons-material/Cancel";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import NotificationDialog from "../notifications/NotificationDialog";
import axios from "axios";
import deploy from "../../config";

const EditStored = (props) => {
  const { editStoredopen, setEditStoredOpen, tableRowId, getData } = props;

  const [inputdata, setInputData] = useState({
    gift_card: "",
    face_value: "",
    date_added: "",
    end_date: "",
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

  const handleEditStoredClose = () => {
    setEditStoredOpen(false);

    setInputData({
      ...inputdata,
    });
  };

  const submitStoredData = (e) => {
    e.preventDefault();
    setEditDataLoading(true);

    // update api call
    let config = {
      method: "patch",
      url: `${deploy.url}/updateStoredDetails/${tableRowId}`,
      data: inputdata,
    };
    //axios instance
    axios(config)
      .then((data) => {
        // console.log("checkAddData", data.status, data.data)
        setSuccessMessage("User Edited Successfully");
        setFailureMessage("");
        getData();
        handleEditStoredClose();
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
      .get(`${deploy.url}/storedTable/${tableRowId}`)
      .then((data) => {
        setInputData(data.data);
      })
      .catch((error) => {});
  }, [tableRowId]);

  // console.log("checkInputData", inputdata?.fname, inputdata?.fname?.length)

  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={editStoredopen}
        onClose={handleEditStoredClose}
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
            <div>Edit Gift Card</div>
            <div>
              <CancelIcon
                onClick={handleEditStoredClose}
                style={{
                  fontSize: "30px",
                  cursor: "pointer",
                  color: "#3F51B5",
                }}
              />
            </div>
          </div>
        </DialogTitle>
        {inputdata?.gift_card?.length === undefined ||
        inputdata?.gift_card?.length === 0 ? (
          <div style={{ width: "100%", marginTop: "20px" }}>
            <LinearProgress />
          </div>
        ) : (
          <DialogContent dividers>
            <form onSubmit={submitStoredData}>
              <Grid container spacing={2}>
                <Grid item xs={6} style={{ marginBottom: "15px" }}>
                  <TextField
                    id="outlined-basic"
                    label="Gift Card"
                    variant="outlined"
                    fullWidth
                    name="gift_card"
                    value={inputdata.gift_card}
                    onChange={handleChange}
                    required
                  />
                </Grid>

                <Grid item xs={6} style={{ marginBottom: "15px" }}>
                  <TextField
                    id="outlined-basic"
                    label="Face value"
                    variant="outlined"
                    fullWidth
                    name="face_value"
                    value={inputdata.face_value}
                    onChange={handleChange}
                    required
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6} style={{ marginBottom: "15px" }}>
                  <TextField
                    id="outlined-basic"
                    label="Date added"
                    variant="outlined"
                    fullWidth
                    name="date_added"
                    type="string"
                    value={inputdata.date_added}
                    onChange={handleChange}
                    required
                  />
                </Grid>

                <Grid item xs={6} style={{ marginBottom: "15px" }}>
                  <TextField
                    id="outlined-basic"
                    label="Date end"
                    variant="outlined"
                    fullWidth
                    name="end_date"
                    type="string"
                    value={inputdata.end_date}
                    onChange={handleChange}
                    required
                  />
                </Grid>
              </Grid>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                {EditDataLoading ? (
                  <CircularProgress style={{ color: "#fff" }} />
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </DialogContent>
        )}
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

export default EditStored;
