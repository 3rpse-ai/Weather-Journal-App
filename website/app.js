//import { request } from "express";

/* Global Variables */
const apiKey = "&APPID=f44cb97f3f4f45c41e014d003b3551e7&units=imperial";
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate()+'.'+ d.getMonth()+'.'+ d.getFullYear();

//HTML reference variables
const button = document.getElementById("generate");
const feelingsBox = document.getElementById("feelings");
const zipBox = document.getElementById("zip");
const entryField = document.querySelector(".holder.entry")
const entryDate = document.getElementById("date");
const entryTemp = document.getElementById("temp");
const entryFeel = document.getElementById("content");

//event listeners
button.addEventListener("click",processWeatherData);
entryField.addEventListener("click",function(){
    entryField.style.visibility = "hidden";
})

//dynamic URL
function getURL(){
    const location = zipBox.value;
    let zipCode = "";
    let countryCode = "";
    try{
        zipCode = location.split(',')[0];
        countryCode = location.split(',')[1];
    } catch(error){
        console.log("error",error);
    }
    return baseURL + zipCode + "," + countryCode + apiKey;
}

//networking
const getWeatherData = async (url = '') =>{
    const res = await fetch(url);
    
    try{
        const data = await res.json();
        return data;
    } catch(error){
        console.log("error",error);
    }
}

const postWeatherData = async (url = '', data = {})=>{
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try{
        const newData = await response.json();
        console.log(newData);
    }catch(error){
        console.log("error",error);
    }
}

//Main Function
function processWeatherData(){
    getWeatherData(getURL())
    .then(function(data){
        postWeatherData('/send',{date: newDate, temp: fahrenheitToCelsius(data.main.temp), res: feelingsBox.value})
    })
    .then(function(data){
        updateUI();
    })
};


//Helper Functions
function fahrenheitToCelsius(fahrenheit){
    return ((fahrenheit-32)*5/9);
}


const updateUI = async() =>{
    const req = await fetch('/all');
    
    try{
        const data = await req.json();
        console.log(data);
        entryDate.innerHTML = data.date;
        entryTemp.innerHTML = Math.round(data.temp) + "°C";
        entryFeel.innerHTML = data.res;
        entryField.style.visibility = "visible";
    } catch(error){
        console.log("error",error);
    }
}