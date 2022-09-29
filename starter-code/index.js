const progress = document.querySelector('input[type=range]');
const charLengthEl = document.querySelector("span.length");
const rules = [...document.querySelectorAll(".rule-item input[type=checkbox]")];
const generateBtn = document.querySelector("button");
let password = "";
generateBtn.addEventListener("click", (event) => {
    event.preventDefault();
    password = "";
    document.querySelector(".generatedPassword h2").innerText = generatePassword();
});

function generatePassword(){
    let characterLength = progress.value;

    let ruleNames = getSelectedRules();
    if(ruleNames.length === 0){
        console.log(ruleNames);

        return "";
    }
    for(let i = 0; i < characterLength; i++){
        let ruleFunc = getRuleFunc(ruleNames);

        password +=  window[ruleFunc]();
    }

    return password;
}
function getRuleFunc(ruleNames){
    return ruleNames[Math.floor(Math.random() * ruleNames.length)] ?? null;
}
function symbol(){
    let lookup = "~!@#$%^&*()_+[]{}=,.<>?/\|";
    return lookup[Math.floor(Math.random() * lookup.length)];
}

function upper(){
    return getAsciiCharacterFrom(65, 26);
}

function number(){
    return getAsciiCharacterFrom(48, 10);
}

function lower(){
    return getAsciiCharacterFrom(97, 26);
}

function getAsciiCharacterFrom(start, end){
    return String.fromCharCode(Math.floor(Math.random() * end) + start);
}

function getSelectedRules(){
    return rules.filter((rule) => {
        return rule.checked;
    }).map(rule => {
        return rule.dataset.type;
    })
}

progress.addEventListener('input', function(e) {
    updateProgress(e.target.value);
})

function updateProgress(rawValue){

    let percentage = Math.round(rawValue / 26 * 100);

    charLengthEl.innerText = Math.round(rawValue);
    progress.style.background = `linear-gradient(to right, #A4FFAF 0%, #A4FFAF ${percentage}%, #18171F ${percentage}%, #18171F 100%)`
}