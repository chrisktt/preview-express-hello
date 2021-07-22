const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.get("/", (req, res) => res.send(
  "Hello there! <br> V 102" +
  "<br>hash = " + 
  (process.env.RENDER_GIT_COMMIT || "").substring(0,7) +
  ""
));

app.get("/status", (req, res) => res.status(200).json({message: 'ok'}))

app.listen(port, () => console.log(`Example app listening on port http://localhost:${port} !`));

