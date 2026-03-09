// Code inspired by following tutorial: https://www.w3schools.com/howto/howto_js_form_steps.asp 

var currentTab = 0;
showTab(currentTab); 

function showTab(tab) {
    const tabList = document.getElementsByClassName("tab");
    if(tabList.length == 0){return;}

    for(let i = 0; i < tabList.length; i++){
        tabList[i].style.display = "none";
    }

    tabList[tab].style.display = "block"


    const nextButton = document.getElementById("nextBtn");
    const prevButton = document.getElementById("prevBtn");
    const submitButton = document.getElementById("submitButton");
 
    if (prevButton) prevButton.style.display = (tab === 0) ? "none" : "inline";
    if (nextButton) nextButton.style.display = (tab === tabList.length - 1) ? "none" : "inline";
    if (submitButton) submitButton.style.display = (tab === tabList.length - 1) ? "inline" : "none";


    fixStepIndicator(tab)
}

function nextPrev(n) {
  var tabList = document.getElementsByClassName("tab");
  if(tabList.length == 0){return;}

  tabList[currentTab].style.display = "none";
  currentTab += n;

  //error handling
  if(currentTab < 0){
    currentTab = 0;
  } 
  if (currentTab >= tabList.length){
    currentTab = tabList.length - 1; 
  }

  showTab(currentTab);
}

function fixStepIndicator(n) {
    const steps = document.getElementsByClassName("step");
    for (let i = 0; i < steps.length; i++) {
        steps[i].className = steps[i].className.replace(" active", "");
     }
     if(steps[n]){
        steps[n].className += " active";
     }
  
}


document.addEventListener("DOMContentLoaded", function () {
    const form=document.getElementById("surveyQuestions");
    
    form.addEventListener("submit", function (event) {
        const inputs=form.querySelectorAll("input, select, textarea");
        let filled=0;
        inputs.forEach(input => {
            if( (input.type === "radio" || input.type === "checkbox") && input.checked){
                filled++;
            }else if (input.type !== "radio" && input.type !== "checkbox" &&ininput.value.trim() !=="") {
                filled++;
            }
        });
        console.log("Survey fields filled:", filled);
    });

});