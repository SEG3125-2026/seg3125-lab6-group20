const express =require("express");
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

    res.send("Thank you for completing the survey!");
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Open the survey at http://localhost:${PORT}/niceSurvey`);
});

