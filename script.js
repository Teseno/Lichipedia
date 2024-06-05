async function api() {
    let section = radioGetter();
    let output = document.getElementById("thing");
    let user = document.getElementById("user").value.replace(" ", "-").toLowerCase();
    if (section != "") {
        let link = "https://www.dnd5eapi.co/api/" + section + "/";

        const response = await fetch (link);
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
    }else{
        output.innerHTML = "Not Found";
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
async function detailsGetter(url) {
    let output = document.getElementById("thing");
    let link = "https://www.dnd5eapi.co" + url;
    const response = await fetch (link);
    const hold = await response.json();
    output.innerHTML = "";
    let stringedVal = "";
    for (const [key, value] of Object.entries(hold)) {
        if (value instanceof Object){
            output.innerHTML += key + " : ";
            for (const [kew, vawue] of Object.entries(value)) {
                stringedVal = JSON.stringify(vawue);
                stringedVal = stringedVal.replace('"','').replace('[','<br>').replace('-',' ').replace('"','').replace('{','<br>').replace(']','<br>').replace('}','<br>').replace('\n','<br>');
                output.innerHTML += stringedVal + " ";
            }
            output.innerHTML += "<br><br>";
        }else{
            stringedVal = JSON.stringify(value);
            stringedVal = stringedVal.replace('"','').replace('[','<br>').replace('-',' ').replace('"','').replace('{','<br>').replace(']','<br>').replace('}','<br>').replace('\n','<br>');
            output.innerHTML += key + " : " + stringedVal + " <br>";
        }
    }
}