if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js");
  });
}


// ==================================================
// STOP SCROLL / TOUCH MOVE (optional UX lock)
// ==================================================
document.addEventListener(
    "touchmove",
    function (e) {
        e.preventDefault();
    },
    { passive: false }
);

// ==================================================
// VIBRATION (iPhone Haptics)
// ==================================================
function vibrate(style = 10) {
    if ("vibrate" in navigator) {
        navigator.vibrate(style);
    }
}

// ==================================================
// STATE (3 Gruppen mit separaten Werten)
// ==================================================
const state = {
    group1: { muscle: 0, brain: 0, skill: 0, money: 0 },
    group2: { muscle: 0, brain: 0, skill: 0, money: 0 },
    group3: { muscle: 0, brain: 0, skill: 0, money: 0 }
};

let currentGroup = "group1";

// ==================================================
// DOM ELEMENTS
// ==================================================
const displays = {
    muscle: document.getElementById("display_muscle"),
    brain: document.getElementById("display_brain"),
    skill: document.getElementById("display_skill"),
    money: document.getElementById("display_money")
};

const counters = {
    muscle: document.getElementById("counter_muscle"),
    brain: document.getElementById("counter_brain"),
    skill: document.getElementById("counter_skill"),
    money: document.getElementById("counter_money")
};

const groupButtons = {
    group1: document.querySelector(".group1"),
    group2: document.querySelector(".group2"),
    group3: document.querySelector(".group3")
};

// ==================================================
// UI UPDATE (Counter Werte)
// ==================================================
function updateUI() {
    const data = state[currentGroup];

    displays.muscle.textContent = data.muscle;
    displays.brain.textContent = data.brain;
    displays.skill.textContent = data.skill;
    displays.money.textContent = data.money;
}

// ==================================================
// GROUP BUTTON UI UPDATE (SVG swap)
// ==================================================
function updateGroupUI() {
    Object.keys(groupButtons).forEach(group => {
        const btn = groupButtons[group];
        const img = btn.querySelector("img");

        if (group === currentGroup) {
            img.src = `images/${group}_active.svg`;
        } else {
            img.src = `images/${group}.svg`;
        }
    });
}

// ==================================================
// VALUE LOGIC
// ==================================================
function changeValue(stat, delta) {
    state[currentGroup][stat] += delta;
    updateUI();
}

function clearValue(stat) {
    state[currentGroup][stat] = 0;
    updateUI();
}

// ==================================================
// COUNTER INIT
// ==================================================
function initCounter(stat) {
    const counter = counters[stat];

    const plusBtn = counter.querySelector(".plus");
    const minusBtn = counter.querySelector(".minus");
    const clearBtn = counter.querySelector(".clear");

    plusBtn.addEventListener("click", () => {
        vibrate();
        changeValue(stat, 1);
    });

    minusBtn.addEventListener("click", () => {
        vibrate();
        changeValue(stat, -1);
    });

    clearBtn.addEventListener("click", () => {
        vibrate();
        clearValue(stat);
    });
}

// ==================================================
// GROUP SWITCH
// ==================================================
function setGroup(groupName) {
    currentGroup = groupName;
    vibrate();
    updateUI();
    updateGroupUI();
}

// ==================================================
// INIT COUNTERS
// ==================================================
initCounter("muscle");
initCounter("brain");
initCounter("skill");
initCounter("money");

// ==================================================
// GROUP BUTTON EVENTS
// ==================================================
groupButtons.group1.addEventListener("click", () => setGroup("group1"));
groupButtons.group2.addEventListener("click", () => setGroup("group2"));
groupButtons.group3.addEventListener("click", () => setGroup("group3"));

// ==================================================
// START APP
// ==================================================
updateUI();
updateGroupUI();
