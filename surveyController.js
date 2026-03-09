//needed to get data from survey
var bodyParser = require('bodyParser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var fs = require('fs'); //file system 'library'
var path = require('path')

module.exports = function(app){
	const urlencodedParser = bodyParser.urlencoded({extended:false});
	app.use(bodyParser.json());

	app.get("/niceSurvey", (req,res) =>{
		res.sendFile(path.join(__dirname,"index.html"));
	});

	app.post("/submitSurvey", urlencodedParser, (req,res) => {
		const surveyData = req.body;
		console.log("Response recieved:", surveyData);

		const filePath = path.join(__dirname, "surveyResults.json");
		let jsonData = [];

		if(fs.existsSync(filePath)){
			try{
				const fileContents = fs.readFileSync(filePath);
				jsonData = JSON.parse(fileContents);
			} catch(err){
				console.error("Error readubg surveyResults.json, starting fresh.");
				jsonData = [];
			}
		}

		jsonData.push(surveyData);
		fs.writeFileSync(filePath,JSON.stringify(jsonData));

		res.redirect("/analysis");
	}); 

	app.get("/analysis",(req, res) => {
		res.sendFile(path.join(__dirname, "analysis.html"));
	});

	app.get("/surveyresults", (req,res) =>{
		const filePath = path.join(__dirname,"surveyResults.json");
		let surveyData = [];

		if(fs.existsSync(filePath)){
			try{
				surveyData = JSON.parse(fs.readFileSync(filePath));
			}catch(err){
				console.error("Error reading surveyResults.json");
				surveyData = [];
			}
		}
		res.json({responses:surveyData});
	});

};