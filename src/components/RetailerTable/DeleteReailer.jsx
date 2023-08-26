import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import axios from "axios";
import NotificationDialog from "../notifications/NotificationDialog";
import CircularProgress from "@mui/material/CircularProgress";
import deploy from "../../config";

const DeleteComapny = (props) => {
  const [loader, setLoader] = useState(false);
  const {
    deleteComapnyOpen,
    setDeleteCompanyOpen,
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

  const handleDeleteCompanyClose = () => {
    setDeleteCompanyOpen(false);
  };

  const handleUserDelete = () => {
    setLoader(true);

    // delete api call

    let config = {
      method: "delete",
      url: `${deploy.url}/deleteRetailer/${tableRowId}`,
    };

    //axios instance
    axios(config)
      .then((data) => {
        // console.log("checkDeleteData", data.status, data.data)
        getData();
        setSuccessMessage("Retailer Deleted Successfully");
        setFailureMessage("");
        // get call
        handleDeleteCompanyClose();
      })
      .catch((error) => {
        //  console.log("checkDeleteData error", error.response.data, typeof (error.response.data.message))
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
        open={deleteComapnyOpen}
        onClose={handleDeleteCompanyClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <div style={{ textAlign: "center" }}>
            <h3 style={{ marginTop: "0px" }}>
              Are you sure to delete this retailer?
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
              onClick={handleDeleteCompanyClose}
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

export default DeleteComapny;
