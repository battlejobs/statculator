document.addEventListener(
    "touchmove",
    function (e) {
        e.preventDefault();
    },
    { passive: false }
);

const groupButtons = {
    group1: document.querySelector(".group1"),
    group2: document.querySelector(".group2"),
    group3: document.querySelector(".group3")
};

// ---------------------------
// GROUP ICON UPDATE
// ---------------------------
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

// ---------------------------
// STATE (3 Gruppen, 4 Werte)
// ---------------------------
const state = {
    group1: { muscle: 0, brain: 0, skill: 0, money: 0 },
    group2: { muscle: 0, brain: 0, skill: 0, money: 0 },
    group3: { muscle: 0, brain: 0, skill: 0, money: 0 }
};

let currentGroup = "group1";

// ---------------------------
// ELEMENTE
// ---------------------------
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

// ---------------------------
// DISPLAY UPDATE
// ---------------------------
function updateUI() {
    const data = state[currentGroup];

    displays.muscle.textContent = data.muscle;
    displays.brain.textContent = data.brain;
    displays.skill.textContent = data.skill;
    displays.money.textContent = data.money;
}

// ---------------------------
// COUNTER ACTIONS
// ---------------------------
function changeValue(stat, delta) {
    state[currentGroup][stat] += delta;
    updateUI();
}

function clearValue(stat) {
    state[currentGroup][stat] = 0;
    updateUI();
}

// ---------------------------
// BUTTON EVENTS
// ---------------------------
function initCounter(counterId, stat) {
    const counter = counters[stat];

    const plusBtn = counter.querySelector(".plus");
    const minusBtn = counter.querySelector(".minus");
    const clearBtn = counter.querySelector(".clear");

    plusBtn.addEventListener("click", () => changeValue(stat, 1));
    minusBtn.addEventListener("click", () => changeValue(stat, -1));
    clearBtn.addEventListener("click", () => clearValue(stat));
}

// ---------------------------
// GROUP SWITCH
// ---------------------------
function setGroup(groupName) {
    currentGroup = groupName;
    updateUI();
    updateGroupUI();
}

// ---------------------------
// INIT
// ---------------------------
initCounter("counter_muscle", "muscle");
initCounter("counter_brain", "brain");
initCounter("counter_skill", "skill");
initCounter("counter_money", "money");

// Group buttons
document.querySelector(".group1").addEventListener("click", () => setGroup("group1"));
document.querySelector(".group2").addEventListener("click", () => setGroup("group2"));
document.querySelector(".group3").addEventListener("click", () => setGroup("group3"));

// Start
updateUI();
updateGroupUI();