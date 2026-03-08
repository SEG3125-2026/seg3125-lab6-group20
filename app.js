document.addEventListener("DOMContentLoaded", function () {
    const form=document.getElementById("surveyQuestions");
    form.addEventListener("submit", function (event) {
        const inputs=form.querySelectorAll("input, select, textarea");
        let filled=0;
        inputs.forEach(input => {
            if (input.value !=="" && input.checked !==false) {
                filled++;
            }
        });
        console.log("Survey fields filled:", filled);
    });

});