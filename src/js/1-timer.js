import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import errorIcon from "../img/errorIcon.svg";

const datePicker = document.querySelector("#datetime-picker");
datePicker.classList.add("datetime-picker");

const buttonDataStart = document.querySelector("button[data-start]");
buttonDataStart.classList.add("button-data-start");
buttonDataStart.disabled = true;

let userSelectedDate = null;
let timerInterval;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0].getTime();        
        if (userSelectedDate > Date.now()) {
            buttonDataStart.disabled = false;            
        }
        else { 
            iziToast.error({                
                message: 'Please choose a date in the future',
                position: 'topRight',
                backgroundColor: '#ef4040',
                messageColor: '#fff',
                iconUrl: errorIcon,
                iconColor: '#fff', 
                theme: 'dark',
            });
            buttonDataStart.disabled = true;
        }        
  },
};

buttonDataStart.addEventListener("click", () => {
    buttonDataStart.disabled = true;
    datePicker.disabled = true;
    updateTimerValue();
    timerInterval = setInterval(updateTimerValue, 1000);

    function updateTimerValue() {
        const timerLeft = userSelectedDate - Date.now();
        if (timerLeft <= 0) {
            clearInterval(timerInterval); 
            datePicker.disabled = false;
            updateTimerScreen({ days: 0, hours: 0, minutes: 0, seconds: 0 }); 
            return;
        }
        updateTimerScreen(convertMs(timerLeft));
    }       
});

flatpickr("#datetime-picker", options);

function convertMs(ms) {  
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);  
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


function updateTimerScreen({ days, hours, minutes, seconds }) {
  document.querySelector("[data-days]").textContent = days.toString().padStart(2, "0");
  document.querySelector("[data-hours]").textContent = hours.toString().padStart(2, "0");
  document.querySelector("[data-minutes]").textContent = minutes.toString().padStart(2, "0");
  document.querySelector("[data-seconds]").textContent = seconds.toString().padStart(2, "0");
}

