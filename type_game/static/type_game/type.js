document.addEventListener('DOMContentLoaded', function() {
    random_para();
    inp_field.addEventListener("input", typing);
    // startbtn.addEventListener("click", reset_game);
});

const random_content = document.querySelector(".random_content").innerHTML;

const typing_text = document.querySelector(".typing-text p");
const inp_field = document.querySelector(".input-field");
const time_tag = document.querySelector(".time span b");
const miss_tag = document.querySelector(".miss span");
const wpm_tag = document.querySelector(".wpm span");
const cpm_tag = document.querySelector(".cpm span");
const startbtn = document.querySelector(".start-btn");
const end_result = document.querySelector(".endtyping_result");
const end_restart = document.querySelector(".form-btn");
const initial_result = document.querySelector(".result-details");
const initial_btn = document.querySelector(".restart-btn");
const miss_tag_result = document.querySelector(".miss1");
const wpm_tag_result = document.querySelector(".wpm1");
const cpm_tag_result = document.querySelector(".cpm1");

let char_index = 0;
let mistakes = 0;
let is_typing = false;
let timer;
let max_time = 60;
let time_left = max_time;

let mistakes_result = 0;
let wpm_result = 0; 
let cpm_result = 0;

// create a random number to select the content of paragraphs
function random_para() {
    // let random_num = Math.floor(Math.random() * paragraphs.length);
    typing_text.innerHTML = "";
    random_content.split("").forEach(span => {
        let span_tag = `<span>${span}</span>`;
        typing_text.innerHTML += span_tag;
    });

    typing_text.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inp_field.focus());
    typing_text.addEventListener("click", () => inp_field.focus());
};

function typing(){
    // only left the selected Timer & change to the selected time
    time_tag.innerText = time_left;
    time_tag.style.color = "white";
    document.querySelector("#timer30s").style.display = "none";
    document.querySelector("#timer15s").style.display = "none";


    const characters = typing_text.querySelectorAll("span");
    let typed_Char = inp_field.value.split("")[char_index];
    if (char_index < characters.length - 1 && time_left > 0){
        // To make sure once timer start, it wont start again on evert key entered
        if(!is_typing) {
            timer = setInterval(initTimer, 1000);
            is_typing = true;
        }
        // if user press backspace or not char
        if(typed_Char == null) {
            char_index--;
            if (characters[char_index].classList.contains("incorrect")) {
                mistakes--;
            }
            characters[char_index].classList.remove("correct","incorrect");
        } else{
    
            if(characters[char_index].innerText === typed_Char) {
                characters[char_index].classList.add("correct");
            } else {
                mistakes++;
                characters[char_index].classList.add("incorrect");
            }
            char_index++;
    
        }
    
        characters.forEach(span => span.classList.remove("active"));
        characters[char_index].classList.add("active");
    
        let wpm = Math.round((((char_index - mistakes) / 5) / (max_time - time_left)) * 60);
        //if wpm value is 0, empty, or infinity. Set the value to 0
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        miss_tag.innerText = mistakes;
        wpm_tag.innerText = wpm;
        cpm_tag.innerText = char_index - mistakes;

        mistakes_result = mistakes;
        wpm_result = wpm;
        cpm_result = char_index - mistakes;
        


    } else{
        inp_field.value = "";
        // add hide animation to show only for the result
        typing_text.classList.add("hide");
        // hide the initial result 
        initial_result.classList.add("hide-result");
        initial_result.addEventListener("animationend", () =>{
            initial_result.style.display = "none";
        })
        initial_btn.classList.add("hide-result");
        initial_btn.addEventListener("animationend", () =>{
            initial_btn.style.display = "none";
        })
        //appear the end result & restart button 


        end_result.classList.add("appear-result");
        end_restart.classList.add("appear-result");
        miss_tag_result.innerText = mistakes_result;
        wpm_tag_result.innerText = wpm_result;
        cpm_tag_result.innerText = cpm_result;

        clearInterval(timer);

    }
}

function initTimer() {
    if(time_left >0) {
        time_left --;
        time_tag.innerText = time_left;
    } else {
        clearInterval(timer);
    }
}


function click_time(time) {
    if(time == 30){
        document.querySelector("#timer60s").style.color = "rgba(255, 255, 255, 0.336)";
        document.querySelector("#timer15s").style.color = "rgba(255, 255, 255, 0.336)";
        document.querySelector("#timer30s").style.color = "white";
    }
    else if(time == 60){
        document.querySelector("#timer30s").style.color = "rgba(255, 255, 255, 0.336)";
        document.querySelector("#timer15s").style.color = "rgba(255, 255, 255, 0.336)";
        document.querySelector("#timer60s").style.color = "white";
    } else{
        document.querySelector("#timer60s").style.color = "rgba(255, 255, 255, 0.336)";
        document.querySelector("#timer30s").style.color = "rgba(255, 255, 255, 0.336)";
        document.querySelector("#timer15s").style.color = "white";
    }
    max_time = time;
    time_left = time;
}