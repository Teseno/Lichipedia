async function api() {
    let section = radioGetter();
    let output = document.getElementById("thing");
    if (section != "") {
        let link = "https://lichapi.sinij.engineer/" + section;
        let user = document.getElementById("user").value;

        const response = await fetch (link);
        const hold = await response.json();
        console.log(hold.results[0].name);
        output.innerHTML = hold.results[0].name;
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
    async function listDisplay() {
        
    }
}