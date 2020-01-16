// Get Data
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

let currentRotation;
let generateCurrentRotation = _ => {
    let input = document.getElementById("rotations").value;
    // Similar to arrays, copies of objects are actually just
    // pointers. This JSON code is the object equivalent of
    // Array#slice with no parameters.
    let copy = JSON.parse(JSON.stringify(rotations));
    let raw = copy[input];

    // Add breaks in respect to number of rotators. (+20 min per rotator)
    for(let i = 0; i < getRotators(); i++){
        raw.push(`Break ${i + 1}`);
    }
    
    return raw;
}

// Table Functions
let currentRotationTimes = {};
let populateTable = _ => {
    // Reset
    currentRotation = generateCurrentRotation().slice();
    populateList();
    clearTable();

    // Use list option to skip ahead in list iteration, otherwise, 0
    let iterate = 0;
    for(let i = 0; i < currentRotation.length; i++){
        if(currentRotation[i] === getStartingSpot()) iterate = i;
    }
    let open = getOpenTime();

    let iteratedSpot = {};
    while(open.isBefore(getCloseTime())){
        iteratedSpot[open] = currentRotation[iterate];
        addToTable(open.format("h:mm a"), currentRotation[iterate]);
        open.add(20, "minutes");

        currentRotationTimes[open] = currentRotation[iterate];
        
        iterate = iterate < currentRotation.length - 1 ? iterate + 1 : 0
    }
}

let populateList = _ => {
    let spots = document.getElementById("spots");
    if(spots.firstChild.value === currentRotation[0]) return;

    while(spots.lastChild) spots.removeChild(spots.lastChild);
    // Update starting spot choice
    for(let i = 0; i < currentRotation.length; i++){
        let op = document.createElement("option");
        op.innerHTML = currentRotation[i];
        document.getElementById("spots").appendChild(op);
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
    // Clear table
    let tbody = document.getElementsByTagName("tbody")[0];
    while(tbody.lastChild) tbody.removeChild(tbody.lastChild);
}

// Option Choice Updates Everything
let inputs = document.querySelectorAll(".inp");
inputs.forEach(i => {
    i.addEventListener("change", populateTable);
});

// Clock
let updateClock = _ => {
    let now = moment();
    let format = now.format("h:mm:ss a");
    document.getElementById("clock").innerHTML = format;

    setTimeout(updateClock, 500);
}

// DEFAULTS
(_ => {
    populateTable();
    updateClock();
})();