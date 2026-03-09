//needed to get data from survey
var bodyParser = require('bodyParser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var fs = require('fs'); //file system 'library'
var path = require('path')

//read file data 
function readData(fileName){
	const filePath = path.join(__dirname, "data", fileName + ".json"); 

	if(!fs.existsSync(filePath)) {
		//error handling
		return []
	};

	let dataRead = fs.readFileSync(filePath);
	let infoRead = JSON.parse(dataRead);

	return infoRead;
}

//write data 
function writeData(info, fileName){
	const filePath = path.join(__dirname, "data", fileName +".json");
	let data = JSON.stringify(info); 
	fs.writeFileSync(filePath, data);
}

//update file
function counts(name,value){
	let info = readData(name);
	let found = false;

  	for (let i = 0; i < info.length; i++) {
        if (info[i][name] === value) {
            info[i].count = parseInt(info[i].count) + 1;
            found = true;
            break;
        }
    }

    if(!found){
    	info.push({ [name]: value, count: 1 });

    }
    writeData(info,name); 
}

module.exports = function(app){
	app.get("/index", function(req,res){
		res.sendFile(path.join(__dirname,"index.html"));
	});

	app.post("/index", urlencodedParser, function(req,res){
		const json = req.body;

		for(let key in json){
			if(Array.isArray(json[key])){
				json[key].forEach(item => counts(key,item));
			}else{
				combineCounts(key,json[key]);
			}
		}
		res.redirect("/analysis");
	});

	app.get("analysis", function(req,res){
		res.sendFile(path.join(__dirname,"analysis.html"));
	});
}

