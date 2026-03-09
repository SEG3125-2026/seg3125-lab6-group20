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
    const filePath = path.join(__dirname, "surveyResults.json"); 

    let jsonData = [];
    if (fs.existsSync(filePath)) {
        const fileContents = fs.readFileSync(filePath);
        try {
            jsonData = JSON.parse(fileContents);
        } catch (err) {
            console.error("Error parsing surveyResults.json, starting fresh.");
            jsonData = [];
        }
    }
    jsonData.push(surveyData);

    fs.writeFileSync(filePath, JSON.stringify(jsonData));

    res.redirect("/analysis");

});


app.get("/analysis", (req,res) =>{
    res.sendFile(path.join(__dirname,"analysis.html"));

});

app.get("/surveyresults", (req, res) => {
    const filePath = path.join(__dirname, "surveyResults.json");
    let surveyData = [];
    if (fs.existsSync(filePath)) {
        try {
            surveyData = JSON.parse(fs.readFileSync(filePath));
        } catch (err) {
            console.error("Error reading surveyResults.json");
            surveyData = [];
        }
    }
    res.json({ responses: surveyData });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Open the survey at http://localhost:${PORT}/niceSurvey`);
});

