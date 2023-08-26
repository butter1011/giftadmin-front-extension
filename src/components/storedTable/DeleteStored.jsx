import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import axios from "axios";
import NotificationDialog from "../notifications/NotificationDialog";
import CircularProgress from "@mui/material/CircularProgress";
import deploy from "../../config";

const DeleteStored = (props) => {
  const [loader, setLoader] = useState(false);
  const { deleteStoredOpen, setDeleteStoredOpen, tableRowId, getData } = props;

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

  const handleDeleteStoredClose = () => {
    setDeleteStoredOpen(false);
  };

  const handleStoredDelete = () => {
    setLoader(true);

    // delete api call
    let config = {
      method: "delete",
      url: `${deploy.url}/deleteStored/${tableRowId}`,
    };

    //axios instance
    axios(config)
      .then((data) => {
        // console.log("checkDeleteData", data.status, data.data)

        setSuccessMessage("Gift Card Deleted Successfully");
        setFailureMessage("");
        getData();
        // sessionStorage.setItem("employeePage", page)
        // get call
        // getData({ search: "", gender: "all", status: "all", sort: "new", page });
        // setCurrentPage(page)
        handleDeleteStoredClose();
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
        open={deleteStoredOpen}
        onClose={handleDeleteStoredClose}
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
              onClick={handleStoredDelete}
            >
              {loader ? <CircularProgress style={{ color: "#fff" }} /> : "Yes"}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleDeleteStoredClose}
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

export default DeleteStored;
