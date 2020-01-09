// Get Data
let getRotation = _ => {
    return document.getElementById("rotations").value;
}

let getRotators = _ => {
    return document.getElementById("rotators").value; //string
}

let getStartingSpot = _ => {
    return document.getElementById("spots").value;
}

let getOpenTime = _ => {
    let raw = document.getElementById("opening").value;
    return moment(raw, "HH:mm");
}

let getCloseTime = _ => {
    let raw = document.getElementById("closing").value;
    return moment(raw, "HH:mm");
}

// Table Functions
let currentRotation;
let populateTable = _ => {
    // Reset
    clearTable();
    setBreaks();
    currentRotation = {};

    let iterate = 0;
    let open = getOpenTime();
    let rotation = rotations[getRotation()];

    // Update starting spot choice
    for(let i = 0; i < rotation.length; i++){
        let op = document.createElement("option");
        op.innerHTML = rotation[i];
        document.getElementById("spots").appendChild(op);
    }

    console.log(open.format("hh:mm a"));
    console.log(getOpenTime().format("hh:mm a"));
    console.log(getCloseTime().format("hh:mm a"));

    while(open.isBefore(getCloseTime())){
        currentRotation[open] = rotation[iterate];
        addToTable(open.format("h:mm a"), rotation[iterate]);

        // Check for break, if not normal add
        open.add(20, "minutes");
        
        console.log(rotation.length + " --- " + iterate);
        iterate = iterate < rotation.length - 1 ? iterate + 1 : 0
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

// Option Choice Updates Everything
let inputs = document.querySelectorAll(".inp");
inputs.forEach(i => {
    i.addEventListener("change", populateTable);
});

// Add breaks
let rotations;
let setBreaks = _ => {
    rotations = rawRotations;
    for(let i = 0; i < getRotators; i++){
        rotations[getRotation()].push("Break");
    }
}

// Clock
let updateClock = _ => {
    let format = moment().format("h:mm:ss a");
    document.getElementById("clock").innerHTML = format;
    document.getElementById("currentspot").innerHTML = currentRotation[moment()];
    //console.log(getCloseTime().diff(getOpenTime(), "minutes"))
    setTimeout(updateClock, 100);
}

// DEFAULTs
(_ => {
    populateTable();
    updateClock();
})();