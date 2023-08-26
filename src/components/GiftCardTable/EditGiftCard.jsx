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

const EditEmployee = (props) => {
  const { editEmployeeopen, setEditEmployeeOpen, tableRowId, getData } = props;

  const [inputdata, setInputData] = useState({
    gift_card: "",
    image_url: "",
    trigger_link: "",
    target_url: "",
    author: "",
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

  const handleEditEmployeeClose = () => {
    setEditEmployeeOpen(false);

    setInputData({
      ...inputdata,
    });
  };

  const submitEmployeeData = (e) => {
    e.preventDefault();
    setEditDataLoading(true);

    // update api call
    let config = {
      method: "patch",
      url: `${deploy.url}/updateGiftcardDetails/${tableRowId}`,
      data: inputdata,
    };
    //axios instance
    axios(config)
      .then((data) => {
        // console.log("checkAddData", data.status, data.data)
        getData();
        setSuccessMessage("Gift Card Edited Successfully");
        setFailureMessage("");
        handleEditEmployeeClose();
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
        setEditDataLoading(false);
        handleNotificationClickOpen();
      });
  };

  useEffect(() => {
    // setEmployeeProfileLoader(true);
    axios
      .get(`${deploy.url}/GiftcardTable/${tableRowId}`)
      .then((data) => {
        const triggerArray = data.data.trigger_link.join("\n");
        setInputData({
          gift_card: data.data.gift_card,
          image_url: data.data.image_url,
          trigger_link: triggerArray,
          target_url: data.data.target_url,
          author: data.data.author,
        });
      })
      .catch((error) => {});
  }, [tableRowId]);

  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={editEmployeeopen}
        onClose={handleEditEmployeeClose}
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
                onClick={handleEditEmployeeClose}
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
            <form onSubmit={submitEmployeeData}>
              <Grid container spacing={2}>
                <Grid item xs={14} style={{ marginBottom: "15px" }}>
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
                <Grid item xs={14} style={{ marginBottom: "15px" }}>
                  <TextField
                    id="outlined-basic"
                    label="Image"
                    variant="outlined"
                    fullWidth
                    name="image_url"
                    value={inputdata.image_url}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={14} style={{ marginBottom: "15px" }}>
                  <TextField
                    id="outlined-basic"
                    label="Trigger links"
                    variant="outlined"
                    fullWidth
                    name="trigger_link"
                    value={inputdata.trigger_link}
                    multiline
                    required
                    rows={10}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={14} style={{ marginBottom: "15px" }}>
                  <TextField
                    id="outlined-basic"
                    label="Target Url"
                    variant="outlined"
                    fullWidth
                    name="target_url"
                    value={inputdata.target_url}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={14} style={{ marginBottom: "15px" }}>
                  <TextField
                    id="Author"
                    label="Author"
                    variant="outlined"
                    fullWidth
                    name="author"
                    value={inputdata.author}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={handleChange}
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

export default EditEmployee;
