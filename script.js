//for display the ringing alarm
const alert =  document.createElement('h2');
//for accessing the element in html
const outerBorderDiv = document.getElementById('outerBorderDiv');
const currentTime = document.getElementById('currentTime');
const allAlarmDiv = document.getElementById('allAlarmDiv');
//storing the alarm
const AlarmTime = [];

//keeping the clock running
function updateTime() {
    const clockTime = new Date();
    const currentHours = clockTime.getHours();
    const currentMinute = clockTime.getMinutes();
    const currentSecond = clockTime.getSeconds();
    //display the current time on the screen
    currentTime.textContent = `${currentHours}:${currentMinute}:${currentSecond}`; 
    
    //keeping a timeChek with just hours and min for the alarm action
    const timeCheck = `${currentHours}:${currentMinute}`; 

    //check if the alarm time is met or not
    AlarmTime.forEach(alarm => {
        if (alarm.time == timeCheck) {
            alarmTask(alarm.id);
        }
    });
}

let alarmDisplayed = false;
// Update time every second
setInterval(updateTime, 1000);



// taks that are neended to be performed on the alarm 
function alarmTask(id){
    const music = document.createElement('audio');
    music.src = 'https://www.fesliyanstudios.com/play-mp3/4384';
    music.play();
    // display the alarm id;
    if(!alarmDisplayed){
              alert.innerHTML=`alarm no ${id} is on`;
        outerBorderDiv.prepend(alert);
        alarmDisplayed=true;
    }
}



// create a alarm on the click of the set alarm button
function createAlarm() {
    const setAlarmButton = document.getElementById('setAlarmButton');
    setAlarmButton.addEventListener('click', e => {
        e.preventDefault();
        
        const setAlarmTime = document.getElementById('setAlarmTime').value;
//check for an empty input insertion
        if (setAlarmTime === '') {
            return;
        }

        // create an obj of alarm detials and push it to alarm array;
        const obj = { id: AlarmTime.length + 1, time: setAlarmTime };
        AlarmTime.push(obj);
        // call a function for each alarm created;
        createAlarmElement(obj.id, obj.time);
    });
}

//display the alarm info on the screen
function createAlarmElement(id, time) {
    const singleAlarm = document.createElement('div');

    // print the id no of the alarm
    const alarmSerialNo = document.createElement('h3');
    alarmSerialNo.classList.add('marginLeftRight');
    alarmSerialNo.textContent = id;
    singleAlarm.appendChild(alarmSerialNo);

    //print the time of the alarm
    const alarmTime = document.createElement('h3');
    alarmTime.classList.add('marginLeftRight');
    alarmTime.textContent = time;
    singleAlarm.appendChild(alarmTime);


    //create the remove button
    const alarmRemoveButton = document.createElement('Button');
    alarmRemoveButton.classList.add('marginLeftRight');
    alarmRemoveButton.textContent = 'Remove Alarm';

    // action performed on the remove button
    alarmRemoveButton.addEventListener('click', () => {
        singleAlarm.remove();
        removeAlarm(id);
       
    });

    singleAlarm.appendChild(alarmRemoveButton);
    allAlarmDiv.appendChild(singleAlarm);
}

// remove the alarm index form the array
function removeAlarm(id) {
    const index = AlarmTime.findIndex(alarm => alarm.id === id);
    alert.remove();
    if (index !== -1) {
        AlarmTime.splice(index, 1);
    }
}

createAlarm();
