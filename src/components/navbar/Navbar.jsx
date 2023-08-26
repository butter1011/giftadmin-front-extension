import Button from "@mui/material/Button";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Popover from "@mui/material/Popover";

const Navbar = ({ handleLogout }) => {
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState("/");
  const [popover, Setpopover] = useState(null);

  const handlePopClick = (event) => {
    Setpopover(event.currentTarget);
  };

  const handlePopClose = () => {
    Setpopover(null);
  };

  const handleClick = (path) => {
    setActiveComponent(path);
    navigate(path);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "rgb(50, 119, 213)",
        marginBottom: "20px",
        backgroundSize: "100% auto",
        minWidth: "100vw",
        height: "117px",
      }}
    >
      <div style={{ color: "#fff", marginLeft: "10px" }}>
        <img
          src="/imgs/logo.png"
          alt="giftomatic"
          width={250}
          height={100}
          className="logo"
          style={{ marginLeft: "50px" }}
        ></img>
      </div>

      <div style={{ display: "flex", gap: "10px", marginLeft: "100px" }}>
        <Button
          variant="text"
          style={{
            fontSize: "20px",
            color: activeComponent === "/" ? "#422057FF" : "#ffffff",
          }}
          onClick={() => handleClick("/")}
        >
          Gift Cards
        </Button>
        <Button
          variant="text"
          style={{
            fontSize: "20px",
            color:
              activeComponent === "/home/retailerTable"
                ? "#422057FF"
                : "#ffffff",
            marginLeft: "20px",
          }}
          onClick={() => handleClick("/home/retailerTable")}
        >
          Retailers
        </Button>
        <Button
          variant="text"
          style={{
            fontSize: "20px",
            color:
              activeComponent === "/home/storedTable" ? "#422057FF" : "#ffffff",
            marginLeft: "20px",
          }}
          onClick={() => handleClick("/home/storedTable")}
        >
          Giftcards stored
        </Button>
        <Button
          variant="text"
          style={{
            fontSize: "20px",
            color:
              activeComponent === "/home/statisticTable"
                ? "#422057FF"
                : "#ffffff",
            marginLeft: "20px",
          }}
          onClick={() => handleClick("/home/statisticTable")}
        >
          Statistic Table
        </Button>
      </div>
      <div>
        <Button onClick={handlePopClick}>
          <img
            src="/imgs/avatar.png"
            alt=" "
            width={30}
            height={30}
            className="navbar-img"
          ></img>
        </Button>
        <Popover
          id="simple-popover"
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(popover)}
          anchorEl={popover}
          onClose={handlePopClose}
        >
          <Button onClick={handleLogout}>Logout</Button>
        </Popover>
      </div>
      <div>
        <img
          src="/imgs/navbar.png"
          alt=" "
          width={500}
          height={120}
          className="navbar-img"
        />
      </div>
    </div>
  );
};

export default Navbar;
