// import { DiceRoll } from '@dice-roller/rpg-dice-roller';
async function api() {
    let section = radioGetter();
    let output = document.getElementById("thing");
    let user = document.getElementById("user").value.replaceAll(" ", "-").toLowerCase();
    if (section != "") {
        let link = "https://www.dnd5eapi.co/api/" + section + "/";
        const response = await fetch(link);
        const hold = await response.json();
        output.innerHTML = "";
        for (i = 0; i < hold.results.length; i++) {
            if (hold.results[i].index.includes(user)) {
                output.innerHTML += hold.results[i].index + " | ";
            }
            if (hold.results[i].index == user) {
                detailsGetter(hold.results[i].url);
                break;
            }
        }
    } else {
        output.innerHTML = "Not Found";
        return null;
    }
} 
function radioGetter() {
    var checker = document.querySelector('input[name="a"]:checked');
    if (checker != null) {
        return checker.id;
    }
    else {
        return "";
    }
}
async function detailsGetter (url) {
    let output = document.getElementById("thing");
    let link = "https://www.dnd5eapi.co" + url;
    const response = await fetch(link);
    const hold = await response.json();
    output.innerHTML = "";
    let stringedVal = "";
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
async function randomPage() {
    let output = document.getElementById("pg2Output");
    let hold =  await getLink("/api");
    let pickerArr = Object.values(hold);
    let numHolder = Math.round(Math.random() * 23);
    hold = await getLink(pickerArr[numHolder]);
    numHolder = Math.round(Math.random() * hold.results.length - 1);
    hold = await getLink(hold.results[numHolder].url);
    console.log(hold);
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
async function getLink (url) {
    let link = "https://www.dnd5eapi.co" + url;
    const response = await fetch(link);
    const temp = await response.json();
    return temp;
}

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