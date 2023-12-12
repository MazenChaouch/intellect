const express = require("express");
const soap = require("soap");
const bodyParser = require("body-parser");
const { getFormation } = require("./soapService");

const app = express();
app.use(bodyParser.raw({ type: () => true }));
app.use(bodyParser.json());

const service = {
  YourService: {
    YourServicePort: {
      getFormation: function (args, callback) {
        getFormation(args, callback);
      },
    },
  },
};

const xml = require("fs").readFileSync("./auth/soap_service.wsdl", "utf8");
app.get("/wsdl", (req, res) => {
  res.set("Content-Type", "text/xml");
  res.status(200).send(xml);
});

app.post("/soap/getformations", (req, res) => {
  const wsdl_path = "/wsdl";
  soap.listen(app, wsdl_path, service, xml);
  res.status(200).send("SOAP service running");
});

app.post("/formations", (req, res) => {
  // Assuming formations are sent in the request body from SOAP service
  const formations = req.body.formations;

  // Process formations and send a response
  // For example, here we're just sending formations back as a response
  res.json({ formations });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
