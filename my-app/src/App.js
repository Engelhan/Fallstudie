import React from 'react';
import './App.css';
import axios from "axios";
import ProjectDrawer from './Components/ProjectDrawer';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

function App() {
  {/*
  const post = () => {
    axios.post("https://localhost:5001/weatherforecast/sendProjects",{
          "projectId": 12,
          "projectName": "234"
        }
    ).then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  };

  const get = () => {
    axios.get("https://localhost:5001/weatherforecast/getProjects"
    ).then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  };
*/}
  return (
    <div className="App">
      {/*<header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        </header>*/}
      <ProjectDrawer/>
        {/*<div className="App-body">
        <ButtonGroup disableElevation variant="outlined" size="small" color="inherit">
          <Button onClick={post}>Post</Button>
          <Button onClick={get}>Get</Button>
        </ButtonGroup>
      </div>*/}
    </div>
  );
}

export default App;
