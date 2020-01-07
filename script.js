

// Rotation Option Choice
document.getElementById("rotations").addEventListener("change", _ => {
    displayRotationOnTable(document.getElementById("rotations").value);
});

// Table Functions

let displayRotationOnTable = rotation => {
    clearTable();
    for(let i = 0; i < rotations[rotation].length; i++){
        addToTable(Math.floor(Math.random() * 1000), rotations[rotation][i]);
    }
}

let addToTable = (time, spot) => {
    let tbody = document.getElementsByTagName("tbody")[0];
    let tr = document.createElement("tr");
    let timeEl = document.createElement("td");
    let timeText = document.createElement("p");
    let spotEl = document.createElement("td");
    let spotText = document.createElement("p");
    timeText.innerHTML = time;
    spotText.innerHTML = spot;
    
    tbody.appendChild(tr);
    timeEl.appendChild(timeText);
    spotEl.appendChild(spotText);
    tr.appendChild(timeEl);
    tr.appendChild(spotEl);
}

let clearTable = _ => {
    let tbody = document.getElementsByTagName("tbody")[0];
    while(tbody.lastChild) tbody.removeChild(tbody.lastChild);
}

// DEFAULTs
(_ => {
    displayRotationOnTable("tops");
})();