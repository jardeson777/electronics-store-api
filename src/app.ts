import express from "express";
import Routes from "./routes";

const App = express();

Routes(App);

export default App;
