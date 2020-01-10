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
    // Array#slice with no parameters. e.g. myarray.slice();
    let copy = JSON.parse(JSON.stringify(rotations));
    let raw = copy[input];

    // Add breaks in respect to number of rotators. (+20 min per rotator)
    for(let i = 0; i < getRotators(); i++){
        raw.push("<b>Break</b>");
    }
    
    return raw;
}

// Table Functions
let populateTable = _ => {
    // Reset
    currentRotation = generateCurrentRotation().slice();
    populateList();
    clearTable();

    let iterate = 0;
    let open = getOpenTime();

    console.log(open.format("hh:mm a"));
    console.log(getOpenTime().format("hh:mm a"));
    console.log(getCloseTime().format("hh:mm a"));

    let currentSpot = {};
    while(open.isBefore(getCloseTime())){
        currentSpot[open] = currentRotation[iterate];
        addToTable(open.format("h:mm a"), currentRotation[iterate]);

        // Check for break, if not normal add
        open.add(20, "minutes");
        
        iterate = iterate < currentRotation.length - 1 ? iterate + 1 : 0
    }
}

let populateList = _ => {
    let spots = document.getElementById("spots");
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
// Rotation Choice Updates Only Starting Spot List

// Clock
let updateClock = _ => {
    let format = moment().format("h:mm:ss a");
    document.getElementById("clock").innerHTML = format;
    document.getElementById("currentspot").innerHTML = currentRotation[moment()];
    //console.log(getCloseTime().diff(moment(), "seconds"))
    setTimeout(updateClock, 500);
}

// DEFAULTS
(_ => {
    populateTable();
    populateList();
    updateClock();
})();