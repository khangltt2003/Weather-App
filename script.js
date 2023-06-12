let input = document.querySelector("input");
let container = document.querySelector(".container");
let searchButton = document.querySelector(".search i");
let contentDiv = document.querySelector(".content");
let loc = document.querySelector(".container h1");
let time = document.querySelector(".time");
let temp = document.querySelector(".temp");
let weather = document.querySelector(".weather");
let sight = document.querySelector(".sight p");
let wind = document.querySelector(".wind p");
let humidity = document.querySelector(".humidity p");
let message = document.querySelector(".message");


let apiKey = "bd5e378503939ddaee76f12ad7a97608";

async function changeWeatherUI(city){
    let URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    let data = await fetch(URL).then((res)=>{
        return res.json();
    })
    if(data.name){
        console.log(data);
        console.log(data.name);
        input.value = "";
        container.style.height = "500px";
        contentDiv.style.display = "flex";
        loc.innerText = data.name + ", " + data.sys.country;
        time.innerText = new Date().toLocaleString("en-US");
        temp.innerText = data.main.temp + " °C";
        weather.innerText = data.weather[0].main;
        humidity.innerText = data.main.humidity + "%";
        sight.innerText = data.visibility + " m";
        wind.innerText = data.wind.speed + " km/h";

        //remove added classlist
        document.querySelector("body").classList.remove(document.querySelector("body").classList[0]);
        container.classList.remove(container.classList[1]);
        if(data.main.temp  > 25 ){
            document.querySelector("body").classList.add("hot");
            container.classList.add("hot_card");
        }
        else if(data.main.temp > 13){
            document.querySelector("body").classList.add("windy");
            container.classList.add("windy_card");
        }
        else{
            document.querySelector("body").classList.add("cold");
            container.classList.add("cold_card");
        }
    }
    else{
        message.style.display = "unset";
        setTimeout(()=>{
            message.style.display = "none";
        }, 1000)
    }
}
searchButton.addEventListener("click", ()=>{
    let city = input.value;
    changeWeatherUI(city)
})

document.addEventListener("keydown", (event)=>{
    if(event.key === "Enter"){
        let city = input.value;
        changeWeatherUI(city)
    }
})