# FINAL PROJECT (Typing Game) 

This final project is called typing games which is a simple user-friendly typing speed game where index screen(home screen)will show the user a paragraph quote.

User may start the game by just start typing follow the given paragraph follow with the timer given. 

After the timer end, there will be few result show to the user which are "Mistakes" , "WPM" (words per minute) , "CPM" (Characters per minute)

# Distinctiveness and Complexity

I'm a typing person & I like to type alot, so this project is inspired by the typing game that available online e.g. MonkeyType. 
The distinctiveness about this project is the mainly user interface GUI to the user, everything can done in one page & it didnt required to refresh any of the page unless the user want to restart the game again. 
The minimalistic of the GUI to show the user a simple and easy indication to start of the game. Also, it responsive right away to the user when user typing a wrong/missing character.

The complexity of this project is the animation of GUI/interface screen that show to the user & mainly focusing on the Javascript & CSS to program using `animation/keyframe` method.
In this typing game, all the typing character that user press/type in will indicate right away the correct/wrong character & using the green/red color to indicate/respond to user immediately. 
At the same time,
it also show user the animation of lookalike typing animation which show a blinking underline to indicate user which character they should currently type in. 
At the end of the game(out of time), it will also appear a bigger result with sliding animation while the typing screen slowly disappear at the same time. 

It will be much diffrent with other projects on the CS50W because this will be mainly focusing on the animation programming of the project while at the same time using the django feature models to store & retrieve the data(game's paragraph) that is important part of the game. Also, the showing the user a immediate response with their action/playing the game which give user a sbetter experience overall when playing the typing game. 

# Main file contained in this project 

This project is using the Django framawork which when creating a project it will automatic create a necessary default file & stuff. 

To create a specific project using django, there are some of the file that needed to added ourself. In this section, will be explaning on the file that added used for this typing game project. 

## urls.py

```python
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from . import views

urlpatterns = [
    path("",views.index, name="index"),
    path("", views.reset, name="reset"),

```
There will be two paths for this project ``index`` & ``reset`` which only contained of two different function which will be explaine in the next section. 


## views.py

```python 
# Create your views here.

def index(request):
    total_content = Content.objects.all().count()
    random_num = random.randint(1, total_content)
    random_content = Content.objects.get(pk=random_num)
    return render(request, "type_game/index.html", {
        "content" : random_content
    })


def reset(request): 
    if request.method == "GET":
        return HttpResponseRedirect(reverse("index")) 
```

As from the previous ``urls.py``, the ``index`` will be the main function for the main page of the project. 

In the function, the main purpose is to first randomize the backend data which is the paragraph that prepared & to show the user a random content everytime user refresh/enter the section.

The ``reset`` function will be only mainly use for return the user back to the main page which will be the ``index`` url. 

## models.py

```python 
# Create your models here.
class Content(models.Model):
    type_content = models.CharField(max_length=2000)

    def __str__(self): 
        return f"Content {self.id}"
```

There will be one models which is the `Content` model which store the content/paragraph of typing game that will show to the user. 

## HTML 

There are two html file will be use for this project which are the basic layout & the main page (index page)

### layout.html

```html
{% load static %}

<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Type Game</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
        <link href="{% static 'type_game/style.css' %}" rel="stylesheet">
    </head>
    
    <body>
          <div class="body">
            <nav class=" bg-body-tertiary">
              <div class="container">
                <a class="navbar-brand" href="{% url 'reset' %}">
                  <img src="https://cdn-icons-png.flaticon.com/512/61/61013.png" alt="Keyboard" width="70" height="70">
                </a>
                <span class="h1" >Typing Game</span>
              </div>
            </nav>
            {% block body %}
            {% endblock %}
          </div>
    </body>
    {% block script %}s
    {% endblock %}
</html>
```
### index.html
```html 
{% extends "type_game/layout.html" %}
{% load static %}

{% block body %}
    <div class="wrapper">
        <input type="text" class="input-field">
        <div class="content-box ">
            <div class="typing-text">
                <p></p>
                <p style="display: none;" class="random_content">{{content.type_content}}</p>
            </div>
            <div class="content" >
                <ul class="result-details">
                    <li class="time">
                        <p>Time:</p>
                        <a href="#" id="timer60s" onclick="click_time(60)">
                            <span><b>60</b>s</span>
                        </a>
                        <a href="#" id="timer30s" onclick="click_time(30)" >
                            <span><b>30</b>s</span>
                        </a>
                        <a href="#" id="timer15s" onclick="click_time(15)"> 
                            <span><b>15</b>s</span>
                        </a>
                    </li>
                    <li class="miss">
                        <p>Mistakes:</p>
                        <span>0</span>
                    </li>
                    <li class="wpm">
                        <p>WPM:</p>
                        <span>0</span>
                    </li>
                    <li class="cpm">
                        <p>CPM:</p>
                        <span>0</span>
                    </li>
                </ul>
                <form action="{% url 'reset' %}" method="get" class="restart-btn">
                    <button class="btn btn-secondary start-btn">Restart</button>
                </form>
            </div>

        </div>
    </div>

    <div class="endtyping_result">
        <ul class="showresult">
            <li class="barline_result">
                <p class="result_size">Mistakes:</p>
                <span class="result_size miss1">0</span>
            </li>
            <li class="barline_result">
                <p class="result_size">WPM:</p>
                <span class="result_size wpm1">0</span>
            </li>
            <li class="barline_result">
                <p class="result_size">CPM:</p>
                <span class="result_size cpm1">0</span>
            </li>
        </ul>
    </div>
    <form action="{% url 'reset' %}" method="get" class="form-btn">
        <button class="btn btn-secondary start-btn">Restart</button>
    </form>

{% endblock %}

{% block script %}
<script src="{% static 'type_game/type.js' %}"></script>
{% endblock %}
```
The main page(index page) of this project will be most important page of the section where the main game, interface, result will all present to the user in this page. 

Therefore, the animation/keyframe of the page will all done in this page as well. 

The button of the page will be use as a restart button where when user click the button, it will bring the user back to/restart/refresh the page to reset all the config. 

## CSS (style.css)

In the CSS section will be only show for the animation/keyframe section of the part. 

```css (style.css)

.active::before{
    content: "";
    position: absolute;
    left:0;
    bottom:0;
    height:2px; 
    width: 100%;
    opacity: 0;
    background: white;
    animation: blink 1s ease-in-out infinite;
}
@keyframes blink {
    50%{
        opacity: 1;
    }
}


/* hide effect */

.hide {
    animation-name: hide;
    animation-duration: 1s; 
    animation-fill-mode: forwards;

}

@keyframes hide{
    0% {
        opacity: 1; 
        height: 100%;
        font-size: 27px;
    }

    75% {
        opacity: 0;
        height: 100%;
        font-size: 27px;
    }

    100% {
        opacity: 0;
        height: 0px;
        font-size: 0px;
    }
}

.hide-result {
    animation-name: hide-result;
    animation-duration: 1s;
    animation-fill-mode: forwards;
}

@keyframes hide-result{
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}

.appear-result {
    display: block;
    animation-name: appear-result;
    animation-duration: 1s;
    animation-fill-mode: forwards;
}

@keyframes appear-result{
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}
```

In this project, three different animation will be use for two different section: ready stage(before & after start of the game), finish/result stage.

The ready stage of the section the animation is used is called `blink` which mimic the blinking effect of the typing where it show the blinking underline effect on the character where indicate the user where should he/she type on. 

For the finsh/result stage, it will be using two different animation which are the `hide` & `appear` animation effect. The animation on those is to hide the initial game & show/appear the result to the user using the `opacity` property to have a better user viewing experience instant of just popping out or disappear immediately. 

## Javascript (type.js)

In this project, Javascript will be the main/most important file for this project because most of the function/features is all done in front-end where process using javascript. 

### Variables
```javascript 
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
```
This will be all the varaibles will be use for this project where to select the HTML element & some varaibles for calculation. 

### Functions
#### random_para()

```javascript
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
```
`random_para()` function is to randomize the content/paragraph from the backend & show/appear it to the user. 

#### typing()
```javascript
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
```

For the `typing()` function, it is the main function of this project where it trigger when user start the game (when user start to type in)

It will also start calculate the timer & also the result after the game is done/end(when timer timeout). 

#### initTimer()
```javascript
function initTimer() {
    if(time_left >0) {
        time_left --;
        time_tag.innerText = time_left;
    } else {
        clearInterval(timer);
    }
}
```

#### click_time()
```javascript
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
```

`click_time()` function is to let the user have a more flexible gaming experience where user can select three different timer 15,30 & 60 seconds. 

## How to run the project 

Running for this project is no different from any other `django` project. 

The user only need to typing in `python manage.py runserver` in the terminal. However, do in mind that you have to inside the directory of this project which is called `final_project`.