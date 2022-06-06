import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AlertTemplate from "react-alert-template-basic";
import { positions, transitions, Provider as AlertProvider} from "react-alert";

const root = ReactDOM.createRoot(document.getElementById('root'));

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  transitions: transitions.SCALE
};

root.render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} {...options}>
    <App />
    </AlertProvider>
  </React.StrictMode>
);
