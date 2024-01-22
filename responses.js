let responses = getResponses();
const form = document.querySelector("form");
const q1 = form["q1"];
const q2 = form["q2"];


// Checks if there is a valid data model for previous responses
if (!responses) resetLocalStorage();

form.onsubmit = (e) => {
    e.preventDefault();
    console.log(e);
    if (q1.value && q2.value) {
        
    responses["totalResponses"]++;

    addResponses("q1", q1.value);
    addResponses("q2", q2.value);
    
    changeView();

    }
}


// Resets localStorage to a blank data model
async function resetLocalStorage() {
    const saved = await fetch("./responses.json");
    const json = await saved.json();
    localStorage.setItem("surveyResponses", JSON.stringify(json));
    responses = json;
}

// Gets saved responses from localStorage
function getResponses() {
    const saved = JSON.parse(localStorage.getItem("surveyResponses"))
    return saved;
}

// Increments data in the data model
function addResponses(fieldName, response) {
    responses[fieldName][response]++;
    localStorage.setItem("surveyResponses", JSON.stringify(responses));
    console.log(responses);
}

/* 
    The function below updates the DOM by:
    Removing the submit button
    Removing the inputs
    Displaying the percent of people who chose your answer
*/

function changeView() {
    const choices = document.getElementsByClassName("choice");
    const inputs = document.getElementsByTagName("input");

    form.removeChild(document.getElementById("submit"));
    i = 0;
    for (choice of choices) {
        let choiceResponses = inputs[0].value;
        let choiceName = inputs[0].name;
        let responseNumber = responses[choiceName][choiceResponses];
        let responsePercent = (responseNumber / responses["totalResponses"]).toFixed(4);
        console.log(responsePercent);
        (responsePercent * 100 > 5) ? choice.innerHTML = `${(responsePercent * 100).toFixed(2)}%` : choice.innerHTML = "";
        choice.style.backgroundColor = "red";
        choice.style.color = "var(--text-color)"
        choice.style.width = "50px";
        choice.style.height = 100 * responsePercent + "px";
        // choice.style.transition = "height 300ms ease-in-out";
        // choice.style.height="100px";
        i++
    }

}



