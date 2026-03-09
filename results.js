fetch("data/surveyData.json")
.then(res => res.json())
.then(data => {

function countValues(arr, field){
    let counts = {};
    arr.forEach(entry=>{
        let value = entry[field];
        if(!value) return;
        counts[value] = (counts[value] || 0) + 1;
    });
    return counts;
}
function makePie(canvasID, counts){
    new Chart(document.getElementById(canvasID),{
        type:"pie",
        data:{
            labels:Object.keys(counts),
            datasets:[{data:Object.values(counts)}]
        }
    });
}
function makeBar(canvasID, counts, label){
    new Chart(document.getElementById(canvasID),{
        type:"bar",
        data:{
            labels:Object.keys(counts),
            datasets:[{
                label:label,
                data:Object.values(counts)
            }]
        },
        options:{
            scales:{
                y:{beginAtZero:true}
            }
        }
    });
}

let productCounts = countValues(data,"productVisuals");
let cartCounts = countValues(data,"cartClarity");
let noticeCounts = countValues(data,"firstNoticed");
let navigationCounts = countValues(data,"navigation");
let typeCounts = countValues(data,"navigation2");
let demographicCounts = countValues(data,"demographic");
let importantCounts = countValues(data,"important");

let brands = {
RareBeauty:0,
FentyBeauty:0,
Tatcha:0,
Nars:0,
HudaBeauty:0
};

data.forEach(entry=>{
if(entry.rareBeauty) brands.RareBeauty++;
if(entry.fentyBeauty) brands.FentyBeauty++;
if(entry.tatcha) brands.Tatcha++;
if(entry.nars) brands.Nars++;
if(entry.hudaBeauty) brands.HudaBeauty++;
});

makePie("productInformationChart",productCounts);
makePie("cartChart",cartCounts);
makeBar("noticedChart",noticeCounts,"Responses");
makePie("navigationChart",navigationCounts);
makeBar("brandChart",brands,"Brand Recognition");
makePie("typeChart",typeCounts);
makeBar("targetChart",demographicCounts,"Responses");
makeBar("featuresChart",importantCounts,"Votes");

});