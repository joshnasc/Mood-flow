document.addEventListener("DOMContentLoaded", function(){

/* APP QUOTES */

let appQuotes = [
"Your mental health journey matters.",
"Every small step counts towards wellness.",
"Take time to care for your mind.",
"You deserve peace and happiness.",
"Progress, not perfection, is the goal."
]

/* QUOTES */

let quotes=[
"Your mental health matters.",
"You are stronger than you think.",
"Progress not perfection.",
"Small steps every day.",
"Take a deep breath.",
"apna kaam bantha baad me jaye jantha",
"You deserve peace.",
"Your feelings are valid.",
"Be kind to your mind."
]

window.newQuote=function(){

let q=quotes[Math.floor(Math.random()*quotes.length)]

let q1=document.getElementById("quote")
let q2=document.getElementById("quote2")

if(q1) q1.innerText=q
if(q2) q2.innerText=q

}

newQuote()

// Set app quote
let appQuote = document.getElementById("appQuote")
if(appQuote){
appQuote.innerText = appQuotes[Math.floor(Math.random()*appQuotes.length)]
}

/* PAGE NAVIGATION */

window.showPage=function(page){

let pages=document.querySelectorAll(".page")

pages.forEach(p=>p.style.display="none")

let active=document.getElementById(page)

if(active) active.style.display="block"

if(page === 'mood'){
loadSavedMood()
}

}

/* LOGIN/SIGNUP FUNCTIONS */

window.showSignUp=function(){
document.getElementById("loginForm").style.display="none"
document.getElementById("signupForm").style.display="block"
}

window.showLogin=function(){
document.getElementById("signupForm").style.display="none"
document.getElementById("loginForm").style.display="block"
}

window.signUp=function(){

let name=document.getElementById("signupNameInput").value
let password=document.getElementById("signupPasswordInput").value
let age=document.getElementById("ageInput").value

if(name=="" || password=="" || age==""){
alert("Please fill all fields")
return
}

// Store user data
let users = JSON.parse(localStorage.getItem("users") || "{}")
users[name] = {password: password, age: age}
localStorage.setItem("users", JSON.stringify(users))

// Auto login after signup
localStorage.setItem("userName", name)
localStorage.setItem("userAge", age)

document.getElementById("username").innerText=name

document.getElementById("loginPage").style.display="none"
document.getElementById("app").style.display="block"

showPage('home')
}

window.login=function(){

let name=document.getElementById("loginNameInput").value
let password=document.getElementById("loginPasswordInput").value
let users = JSON.parse(localStorage.getItem("users") || "{}")

if(users[name] && users[name].password === password){

localStorage.setItem("userName", name)
localStorage.setItem("userAge", users[name].age)

document.getElementById("username").innerText=name

document.getElementById("loginPage").style.display="none"
document.getElementById("app").style.display="block"

showPage('home')

} else {
alert("Invalid username or password")
}
}

/* AUTO LOGIN */

if(localStorage.getItem("userName")){

let name=localStorage.getItem("userName")

let loginPage=document.getElementById("loginPage")
let app=document.getElementById("app")

if(loginPage) loginPage.style.display="none"
if(app) app.style.display="block"

let user=document.getElementById("username")
if(user) user.innerText=name

showPage('home')
}

/* LOGOUT */

window.logout=function(){

localStorage.removeItem("userName")
location.reload()

}

/* DARK MODE */

window.toggleDarkMode=function(){

document.body.classList.toggle("dark")

}


/* PROFILE PIC */

window.uploadPic=function(event){

let reader=new FileReader()

reader.onload=function(){

let pic=document.getElementById("profilePic")

if(pic) pic.src=reader.result

localStorage.setItem("profilePic",reader.result)

}

reader.readAsDataURL(event.target.files[0])

}

if(localStorage.getItem("profilePic")){

let pic=document.getElementById("profilePic")

if(pic) pic.src=localStorage.getItem("profilePic")

}


/* FOCUS AREAS */

window.selectFocus=function(area){

let focusMessages = {
emotions: "You're focusing on emotions. Track your feelings daily to understand patterns.",
sleep: "You're focusing on sleep. Good sleep is essential for mental health.",
betterme: "You're focusing on self-improvement. Every day is a chance to grow.",
health: "You're focusing on health. Physical and mental wellness go hand in hand.",
hobbies: "You're focusing on hobbies. Doing what you love boosts your mood."
}

let selectedDiv = document.getElementById("selectedFocus")
selectedDiv.innerHTML = `<h3>${focusMessages[area]}</h3>`

// Save focus area
localStorage.setItem("focusArea", area)
}


/* JOURNAL */

window.saveJournal=function(){

let text=document.getElementById("journalText").value

if(text=="") return

let entries=JSON.parse(localStorage.getItem("journal")||"[]")

let entry = {
text: text,
date: new Date().toLocaleDateString(),
time: new Date().toLocaleTimeString()
}

entries.push(entry)

localStorage.setItem("journal",JSON.stringify(entries))

document.getElementById("journalText").value=""

loadJournal()

}

function loadJournal(){

let entries=JSON.parse(localStorage.getItem("journal")||"[]")

let container=document.getElementById("journalEntries")

if(!container) return

container.innerHTML=""

entries.slice().reverse().forEach(e=>{

let div=document.createElement("div")

div.innerHTML = `<strong>${e.date} ${e.time}</strong><br>${e.text}`

container.appendChild(div)

})

}

loadJournal()


/* MOOD TRACKER - UPDATED */

let currentEmotion = ""

window.setEmotion=function(emotion){
currentEmotion = emotion
document.querySelectorAll(".emotionBtn").forEach(btn => {
btn.style.borderColor = "transparent"
})
event.target.style.borderColor = "#2f3c7e"
}

window.updateSleepValue=function(value){
document.getElementById("sleepValue").innerText = value + " hours"
}

window.saveMoodData=function(){
let sleepHours = document.getElementById("sleepHours").value
let date = new Date().toLocaleDateString()

if(!currentEmotion){
alert("Please select an emotion")
return
}

let moodData = JSON.parse(localStorage.getItem("moodData") || "[]")

moodData.push({
date: date,
emotion: currentEmotion,
sleep: sleepHours
})

localStorage.setItem("moodData", JSON.stringify(moodData))

document.getElementById("todayMood").innerText = "Today's Emotion: " + currentEmotion
document.getElementById("todaySleep").innerHTML = "<h3>Sleep: " + sleepHours + " hours</h3>"

// Also save to calendar format
let calendarMood = {}
calendarMood[date] = currentEmotion
localStorage.setItem("calendarMood", JSON.stringify(calendarMood))

alert("Mood saved successfully!")
}

function loadSavedMood(){
let moodData = JSON.parse(localStorage.getItem("moodData") || "[]")
let today = new Date().toLocaleDateString()
let todayData = moodData.find(m => m.date === today)

if(todayData){
document.getElementById("todayMood").innerText = "Today's Emotion: " + todayData.emotion
document.getElementById("todaySleep").innerHTML = "<h3>Sleep: " + todayData.sleep + " hours</h3>"
}
}

/* BREATHING - UPDATED */

window.startBreathing=function(){

let text=document.getElementById("breathText")
let circle=document.getElementById("breathingCircle")

if(!text || !circle) return

let steps=["Breathe In", "Hold", "Breathe Out"]
let currentStep=0
let cycle=0

// Reset circle
circle.className = "breathingCircle"

function runBreathingStep(){
if(cycle >= 3){
text.innerText="Good Job! Exercise Complete"
circle.className = "breathingCircle"
return
}

text.innerText=steps[currentStep]

// Animate circle
if(currentStep === 0){ // Inhale
circle.className = "breathingCircle inhale"
setTimeout(() => {
currentStep = 1
runBreathingStep()
}, 4000)
}
else if(currentStep === 1){ // Hold
circle.className = "breathingCircle inhale"
setTimeout(() => {
currentStep = 2
runBreathingStep()
}, 2000)
}
else if(currentStep === 2){ // Exhale
circle.className = "breathingCircle exhale"
setTimeout(() => {
currentStep = 0
cycle++
runBreathingStep()
}, 4000)
}
}

runBreathingStep()
}


/* CALENDAR */

function generateCalendar(){
let calendar=document.getElementById("calendarGrid")

if(!calendar) return

calendar.innerHTML=""

for(let i=1;i<=30;i++){

let day=document.createElement("div")

day.classList.add("day")

day.innerText=i

let dateKey = new Date()
dateKey.setDate(i)
let dateStr = dateKey.toLocaleDateString()

let calendarMood = JSON.parse(localStorage.getItem("calendarMood") || "{}")

if(calendarMood[dateStr]){
day.classList.add(calendarMood[dateStr])
}

day.onclick=function(){

let mood=prompt("Enter mood (happy/sad/ok/excited/relaxed/tired/unsure/bored/anxious/angry/stressed)")

if(mood){
let validMoods = ["happy","sad","ok","excited","relaxed","tired","unsure","bored","anxious","angry","stressed"]
if(validMoods.includes(mood.toLowerCase())){
day.classList.add(mood.toLowerCase())
let calendarMood = JSON.parse(localStorage.getItem("calendarMood") || "{}")
calendarMood[dateStr] = mood.toLowerCase()
localStorage.setItem("calendarMood", JSON.stringify(calendarMood))
}
}

}

calendar.appendChild(day)

}
}

// Call generateCalendar when calendar page is shown
let originalShowPage = window.showPage
window.showPage = function(page){
originalShowPage(page)
if(page === 'calendar'){
generateCalendar()
}
}

generateCalendar()


/* CHART */

let ctx=document.getElementById("moodChart")

if(ctx){

let moodData = JSON.parse(localStorage.getItem("moodData") || "[]")
let last7Days = moodData.slice(-7)

let moodValues = {
"happy": 5,
"excited": 5,
"relaxed": 4,
"tired": 2,
"unsure": 3,
"bored": 2,
"anxious": 2,
"angry": 1,
"stressed": 1,
"sad": 1,
"ok": 3
}

let chartData = last7Days.map(d => moodValues[d.emotion] || 3)
let labels = last7Days.map(d => d.date.split('/')[0])

while(chartData.length < 7){
chartData.push(3)
labels.push("Day " + (labels.length+1))
}

new Chart(ctx,{

type:"line",

data:{

labels: labels.slice(0,7),

datasets:[{

label:"Mood Level (1-5)",
data:chartData.slice(0,7),
backgroundColor:"rgba(47,60,126,0.2)",
borderColor:"#2f3c7e",
tension:0.4,
fill:true

}]

},
options: {
scales: {
y: {
beginAtZero: true,
max: 5
}
}
}

})

}

})