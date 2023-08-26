import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import axios from "axios";
import NotificationDialog from "../notifications/NotificationDialog";
import CircularProgress from "@mui/material/CircularProgress";
import deploy from "../../config";

const DeleteEmployee = (props) => {
  const [loader, setLoader] = useState(false);
  const {
    deleteEmployeeOpen,
    setDeleteEmployeeOpen,
    tableRowId,
    getData,
  } = props;

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

  const handleDeleteEmployeeClose = () => {
    setDeleteEmployeeOpen(false);
  };

  const handleUserDelete = () => {
    setLoader(true);

    // delete api call
    let config = {
      method: "delete",
      url: `${deploy.url}/deleteGiftcard/${tableRowId}`,
    };

    //axios instance
    axios(config)
      .then((data) => {
        setSuccessMessage("Gift Card Deleted Successfully");
        setFailureMessage("");
        getData();
        handleDeleteEmployeeClose();
      })
      .catch((error) => {
        setSuccessMessage("");
        setFailureMessage("Something Went Wrong");
      })
      .finally(() => {
        setLoader(false);
        handleNotificationClickOpen();
      });
  };

  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={deleteEmployeeOpen}
        onClose={handleDeleteEmployeeClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <div style={{ textAlign: "center" }}>
            <h3 style={{ marginTop: "0px" }}>
              Are you sure to delete this Gift Card?
            </h3>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              marginBottom: "10px",
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={handleUserDelete}
            >
              {loader ? <CircularProgress style={{ color: "#fff" }} /> : "Yes"}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleDeleteEmployeeClose}
            >
              No
            </Button>
          </div>
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

export default DeleteEmployee;
