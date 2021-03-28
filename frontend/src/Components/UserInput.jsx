import React ,{useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import "./input.css";

const btnStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    margin: "10px 10px",
  },
  label: {
    textTransform: "capitalize",
  },
});
const databtnStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .10)",
    margin: "10px 10px",
  },
  label: {
    textTransform: "capitalize",
  },
});

export default function UserInput({getAll, getCurrent}) {
  
  const btnclass = btnStyles();
  const databtnclass = databtnStyles();
  const [input, setInput] = useState("")

  return (
    <div className="postal-div">
      <h1>Weather App</h1> <br />
      <div className="input-div">
        <input
        value={input}
          onChange={(e)=> setInput(e.target.value)}
         className="zip-input"
        ></input>
      </div>
      <br />
      <div style={{ display: "flex", width: "100%" }}>
        <Button
        onClick={()=>getCurrent(input)}
          classes={{
            root: btnclass.root, // class name, e.g. `classes-nesting-root-x`
            label: btnclass.label, // class name, e.g. `classes-nesting-label-x`
          }}
        >
          Get Weather
        </Button>
        <Button
        onClick={()=>getAll(input)}
          classes={{
            root: databtnclass.root, // class name, e.g. `classes-nesting-root-x`
            label: databtnclass.label, // class name, e.g. `classes-nesting-label-x`
          }}
        >
          Get Data
        </Button>
      </div>
    </div>
  );
}
