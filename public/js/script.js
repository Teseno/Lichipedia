// import { DiceRoll } from '@dice-roller/rpg-dice-roller';
/*
    Main Function api()
    Fetches clicked button with radioGetter()
    Checks to see if full name of something in that api section has been typed out
    If so, send request to detailsGetter() where it will display the information
*/
async function api() {
    //Define all variables used
    let section = radioGetter();
    let output = document.getElementById("thing");
    //allows user to type with spaces and capitals instead of being forced to type the specific item ID
    let user = document.getElementById("user").value.replaceAll(" ", "-").toLowerCase();
    //checks to make sure a radio button was selected
    if (section != "") {
        let link = "https://www.dnd5eapi.co/api/" + section + "/";
        const response = await fetch(link);
        const hold = await response.json();
        //sets the output to blank before adding new data
        output.innerHTML = "";
        //displays all important results based on user inputs
        for (i = 0; i < hold.results.length; i++) {
            if (hold.results[i].index.includes(user)) {
                output.innerHTML += hold.results[i].index + " | ";
            }
            if (hold.results[i].index == user) {
                detailsGetter(hold.results[i].url);
                break;
            }
        }
        //if user hasnt selected a radio button
    } else {
        output.innerHTML = "Not Found";
        return null;
    }
} 
//Looks for which radio button was picked
function radioGetter() {
    var checker = document.querySelector('input[name="a"]:checked');
    if (checker != null) {
        return checker.id;
    }
    else {
        return "";
    }
}
//When user has entered the name of the thing their looking for
async function detailsGetter (url) {
    let output = document.getElementById("thing");
    let link = "https://www.dnd5eapi.co" + url;
    const response = await fetch(link);
    const hold = await response.json();
    output.innerHTML = "";
    let stringedVal = "";
    //Removes all the extra "" and {} that occurs when using .JSON
    for (const [key, value] of Object.entries(hold)) {
        //checks for double nested objects
        if (value instanceof Object) {
            output.innerHTML += key + " : ";
            for (const [kew, vawue] of Object.entries(value)) {
                stringedVal = JSON.stringify(vawue);
                stringedVal = stringedVal.replace('"', '').replace('[', '<br>').replace('-', ' ').replace('"', '').replace('{', '<br>').replace(']', '<br>').replace('}', '<br>').replace('\n', '<br>');
                output.innerHTML += stringedVal + " ";
            }
            output.innerHTML += "<br>";
            //if not double nested
        } else {
            stringedVal = JSON.stringify(value);
            stringedVal = stringedVal.replace('"', '').replace('[', '<br>').replace('-', ' ').replace('"', '').replace('{', '<br>').replace(']', '<br>').replace('}', '<br>').replace('\n', '<br>');
            output.innerHTML += key + " : " + stringedVal + " <br>";
        }
    }
}
//For the random Page on the website
async function randomPage() {
    let output = document.getElementById("pg2Output");
    //Sends to a seperate function to prevent CORS error
    let hold =  await getLink("/api");
    let pickerArr = Object.values(hold);
    //picks a random section of the API
    let numHolder = Math.round(Math.random() * 23);
    hold = await getLink(pickerArr[numHolder]);
    //picks a random thing in section
    numHolder = Math.round(Math.random() * hold.results.length - 1);
    hold = await getLink(hold.results[numHolder].url);
    //Removes excess Json noise
    for (const [key, value] of Object.entries(hold)) {
        if (value instanceof Object) {
            output.innerHTML += key + " : ";
            for (const [kew, vawue] of Object.entries(value)) {
                stringedVal = JSON.stringify(vawue);
                stringedVal = stringedVal.replace('"', '').replace('[', '<br>').replace('-', ' ').replace('"', '').replace('{', '<br>').replace(']', '<br>').replace('}', '<br>').replace('\n', '<br>');
                output.innerHTML += stringedVal + " ";
            }
            output.innerHTML += "<br>";
        } else {
            stringedVal = JSON.stringify(value);
            stringedVal = stringedVal.replace('"', '').replace('[', '<br>').replace('-', ' ').replace('"', '').replace('{', '<br>').replace(']', '<br>').replace('}', '<br>').replace('\n', '<br>');
            output.innerHTML += key + " : " + stringedVal + " <br>";
        }
    }
}
//Used to prevent CORS error in randomPage
async function getLink (url) {
    let link = "https://www.dnd5eapi.co" + url;
    const response = await fetch(link);
    const temp = await response.json();
    return temp;
}
//Was supposed to roll a set of virtual dice but kept throwing CORS errors and causing other functions to break

// async function rolledDice () {
    // let output = doccument.getElementById("diceInput").value;
    // const roll = new DiceRoll (output);
    // output = "Raw Dice Output: " + roll.output + "<br>Roll Total: " +roll.total;
    // let dice = document.getElementById("diceInput").value;
    // let link = "https://rpg-dice-roller-api.djpeacher.com/api/roll/" + dice;
    // const response = await fetch(link);
    // const temp = await response.json();
    // let output = getElementById("pg3Output");
    // if (Object.key(temp).contains("error")) {
    //     output.innerHTML = "Error, Please try again."
    // }
    // else {
    //     for (const [key, value] of Object.entries(temp)) {
    //         stringedVal = JSON.stringify(value);
    //         stringedVal = stringedVal.replace('"', '').replace('[', '<br>').replace('-', ' ').replace('"', '').replace('{', '<br>').replace(']', '<br>').replace('}', '<br>').replace('\n', '<br>');
    //         output.innerHTML += key + " : " + stringedVal + " <br>";
    //     }
    // }
// }