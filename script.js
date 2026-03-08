// Code inspired by following tutorial: https://www.w3schools.com/howto/howto_js_form_steps.asp 

var currentTab = 0;

showTab(currentTab); 

function showTab(tab) {
  var nextButton = document.getElementById("nextBtn");
  var prevButton = document.getElementById("prevBtn");
  var submitButton = document.getElementById("submitButton");
  var tabList = document.getElementsByClassName("tab");
  tabList[tab].style.display = "block";
  if (tab == 0) {
    prevButton.style.display = "none";
  } else {
    prevButton.style.display = "inline";
  }
  if (tab == (tabList.length - 1)){
    nextButton.style.display = "none";
    submitButton.style.display = "block";
  } else{
    nextButton.style.display = "inline";
    submitButton.style.display = "none";
  }
  fixStepIndicator(tab)
}

function nextPrev(n) {
  var tabList = document.getElementsByClassName("tab");
  tabList[currentTab].style.display = "none";
  currentTab += n;
  showTab(currentTab);
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, tabList = document.getElementsByClassName("step");
  for (i = 0; i < tabList.length; i++) {
    tabList[i].className = tabList[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  tabList[n].className += " active";
}