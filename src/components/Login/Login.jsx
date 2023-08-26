import Button from "@mui/material/Button";
import React, { useState } from "react";
import { TextField, CircularProgress, Grid, Typography } from "@mui/material";
import axios from "axios";
import deploy from "../../config";
// import { useState } from "react";

const Login = ({ handleLogin }) => {
  const [EditDataLoading, setEditDataLoading] = useState(false);
  const [password, setPassword] = useState("");

  const handeSubmit = (event) => {
    event.preventDefault();
    setEditDataLoading(true);
    const config = {
      method: "POST",
      url: `${deploy.url}/login`,
      data: { password },
    };
    axios(config).then((res) => {
      if (res.data.status) {
        handleLogin();
      }
      setEditDataLoading(false);
    });
  };

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div
      style={{
        background: "rgb(50, 119, 213)",
        backgroundImage: "url('/imgs/login.jpg')",
        marginBottom: "20px",
        backgroundSize: "100% auto",
        minWidth: "100vw",
        height: "100vh",
      }}
    >
      <div
        style={{
          position: "absolute",
        }}
      >
        <img src="/imgs/slider.png" alt="" width={300}></img>
      </div>
      <Grid
        container
        style={{ right: 0, position: "absolute", width: "90%" }}
        spacing={5}
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
      >
        <Grid item xs={6}>
          <Typography
            className="welcome"
            style={{ fontSize: "60px", color: "#4683e0" }}
          >
            Welcome to GiftCard Site
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <img
            src="/imgs/slider3.png"
            alt=""
            width={700}
            style={{ marginTop: "150px" }}
          ></img>
        </Grid>
      </Grid>
      <form onSubmit={handeSubmit}>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={2}
          style={{
            position: "absolute",
            right: 0,
            bottom: 50,
            margin: "auto",
            width: "40%",
          }}
        >
          <Grid item xs={6}>
            <TextField
              id="password"
              label="Input your Password"
              variant="outlined"
              name="user_pwd"
              value={password}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              size="large"
              variant="contained"
              color="primary"
              type="submit"
            >
              {EditDataLoading ? (
                <CircularProgress style={{ color: "#fff" }} />
              ) : (
                "Login"
              )}
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Login;
