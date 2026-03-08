const express =require("express");
const fs = require("fs");
const path = require("path")
const app=express();
const PORT=3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.get("/niceSurvey", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/submitSurvey",(req, res) => {
    const surveyData=req.body;
    console.log("Response received:",surveyData);
    const filePath = path.join(__dirname, "surveyresults.json"); 

    let jsonData = JSON.parse(fs.readFileSync(filePath));
    jsonData.responses.push(surveyData);
    fs.writeFileSync(filePath,JSON.stringify(jsonData))

    res.send("<h3>Thank you for completing the survey!</h3>");
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Open the survey at http://localhost:${PORT}/niceSurvey`);
});

app.get("/analysis", (req,res) =>{
    res.sendFile(path.join(__dirname,"analysis.html"));

});

