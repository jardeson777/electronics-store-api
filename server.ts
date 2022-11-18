import App from "./src/app";
import { db } from "./src/config/databaseConnection";

const port = 4001;

(async () => {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

App.listen(port, () => console.log(`Server starting in localhost:${port}`));
