import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import cautionIcon from "../img/cautionIcon.svg";
import okIcon from "../img/okIcon.svg";
import errorIcon from "../img/errorIcon.svg";

const form = document.querySelector('.form');
form.querySelector('label').classList.add('input-delay-label');

const inputDelay = form.querySelector('input[name="delay"]');
inputDelay.classList.add('input-delay');
inputDelay.removeAttribute('required');

const inputFieldset = form.querySelector('fieldset')
inputFieldset.classList.add('input-fieldset');

inputFieldset.querySelectorAll('label').forEach(label => {
    label.classList.add('input-fieldset-label');
});

inputFieldset.querySelectorAll('input').forEach(radioButton => {
    radioButton.classList.add('input-fieldset-radio');
    radioButton.removeAttribute('required');
});

const buttonSubmit = form.querySelector('button[type="submit"]');
buttonSubmit.classList.add('button-submit');

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    const userDelay = Number(inputDelay.value.trim());
    const userSelectedRadio = inputFieldset.querySelector('input[name="state"]:checked');
        
    if (!userDelay || !userSelectedRadio) {
        showToaster({
            title: 'Caution',
            titleColor: '#fff',
            message: !userDelay
                ? 'Please enter a delay time.' : 'Please select a state.',
            position: 'topRight',
            backgroundColor: '#ffa000',
            messageColor: '#fff',
            iconUrl: cautionIcon,
            iconColor: '#fff', 
            theme: 'dark',
        });
        return;
    }

    const shouldResolve = userSelectedRadio.value === "fulfilled";

    createPromise({delay: userDelay, shouldResolve})
        .then(() => {
            showToaster({
                title: 'OK',
                titleColor: '#fff',
                message: `Fulfilled promise in ${userDelay}ms`,
                position: 'topRight',
                backgroundColor: '#59a10d',
                messageColor: '#fff',
                iconUrl: okIcon,
                iconColor: '#fff',
                theme: 'dark',
            });            
        })
        .catch(() => {
            showToaster({
                title: 'Error',
                titleColor: '#fff',
                message: `Rejected promise in ${userDelay}ms`,
                position: 'topRight',
                backgroundColor: '#ef4040',
                messageColor: '#fff',
                iconUrl: errorIcon,
                iconColor: '#fff', 
                theme: 'dark',
            });            
        });
    form.reset();
}

const createPromise = ({ delay, shouldResolve }) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => { 
            shouldResolve ? resolve() : reject()
    	}, delay);
  });
};

const showToaster = options => {
    iziToast.show(options)
};
    