// Code inspired by following tutorial: https://www.w3schools.com/howto/howto_js_form_steps.asp 

var currentTab = 0;

showTab(currentTab); 

function showTab(tab) {
  var tabList = document.getElementsByClassName("tab");
  tabList[tab].style.display = "block";
  if (tab == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline; text-align: center;";
  }
  if (tab != (tabList.length - 1)){
    document.getElementById("nextBtn").innerHTML = "Next";
  } else {
    document.getElementById("submitButton").innerHTML = "SUBMIT";
  }
  // ... and run a function that displays the correct step indicator:
  //fixStepIndicator(tab)
}

function nextPrev(n) {
  var tabList = document.getElementsByClassName("tab");
  tabList[currentTab].style.display = "none";
  currentTab += n;
  if (currentTab >= tabList.length) {
    document.getElementById("surveyQuestions").submit();
    return false;
  }
  showTab(currentTab);
}