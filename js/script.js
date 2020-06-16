/* Global Variables */

const colorOptions = document.querySelectorAll('#color option');
const designOptions = document.getElementById('design');
const selectParent = document.getElementById('color');
const activitiesParent = document.querySelector('.activities');
let activities = document.querySelectorAll('input[type="checkbox"]');
let activitiesCost = 0;
let totalCost = document.querySelectorAll('.total cost');
const paymentParent = document.querySelector('#payment');
const payment = document.querySelectorAll('#payment option');
const bitcoinSection = document.querySelector('#bitcoin');
const paypalSection = document.querySelector('#paypal');
const creditcardSection = document.querySelector('#credit-card');
const registerButton = document.querySelector('button');
const jobRole = document.querySelectorAll('#title option');
const jobroleParent = document.querySelector('#title');
const otherJobInput = document.querySelector('#other-title');
let email = document.querySelector('#mail');
let cardDetails = document.querySelector('#cc-num');
let activityToolTip = document.createElement('SPAN');

let toolTip = document.createElement('SPAN');
toolTip.textContent = 'E-mail invalid';
toolTip.classList.add('tooltip');
email.parentElement.appendChild(toolTip);
toolTip.parentElement.classList.add('Tooltip-parent');

function testEmail(userInput) {
  return /^[^@]+@[^@.]+\.[a-z]+$/i.test(userInput);
}

// This will validate user input for the email as they input them
// if it doesnt match it will show a tooltip //

email.addEventListener('input', (e) => {
  toolTip.textContent = 'E-mail invalid';
  if (!testEmail(e.target.value)) {
    toolTip.style.display = 'block';
  } else {
    toolTip.textContent = 'Correct!';
    setTimeout(() => (toolTip.style.display = 'none'), 3000);
  }
});

/* This hides the paypal, bitcoin payment section and color section until the user selects them */

paypalSection.style.display = 'none';
bitcoinSection.style.display = 'none';
payment[0].style.display = 'none';

/* This focuses the first input field */

const focus = document.querySelector('#name').focus();

//------------------Job-role---------------//

/* This hides the more your job role info until other is selected */

otherJobInput.style.display = 'none';

jobroleParent.addEventListener('change', (e) => {
  if (e.target.value == 'other') {
    otherJobInput.style.display = 'block';
  } else {
    otherJobInput.style.display = 'none';
  }
});

//-------------T-shirt section ---------------------------//

/* This hides the colors option until a design is selected */

selectParent.style.display = 'none';

/* Below is the event listener for the change of design options  */

designOptions.addEventListener('change', (e) => {
  if (e.target.value == 'js puns') {
    colorOptions[3].removeAttribute('selected');
    selectParent.style.display = 'block';
    colorOptions.forEach((color) => {
      color.style.display = 'none';
    });
    selectParent[0].style.display = 'none';
    colorOptions[0].style.display = 'block';
    colorOptions[0].setAttribute('selected', 'true');
    colorOptions[1].style.display = 'block';
    colorOptions[2].style.display = 'block';
  }
  if (e.target.value == 'Select Theme') {
    selectParent.style.display = 'none';
  }
  if (e.target.value == 'heart js') {
    colorOptions[0].removeAttribute('selected');
    selectParent.style.display = 'block';
    colorOptions.forEach((color) => {
      color.style.display = 'none';
    });
    selectParent[0].style.display = 'none';
    colorOptions[3].style.display = 'block';
    colorOptions[4].style.display = 'block';
    colorOptions[3].setAttribute('selected', 'true');
    colorOptions[5].style.display = 'block';
  }
});

/* Activities I have left in the console log points so
I can see how I tested things when I come back to it.*/

let cost = document.createElement('P');
cost.classList.add('total-cost');
cost.innerHTML = `Total costs: ${activitiesCost}`;

// /* Here I am creating the activity tooltip if there is a conflict */

// let activityToolTip = document.createElement('SPAN');
//             activityToolTip.textContent = "This activity conflicts";
//             activityToolTip.classList.add('tooltip');

activitiesParent.appendChild(cost);

activitiesParent.addEventListener('click', (e) => {
  console.log(e.target);
  if (e.target.tagName == 'INPUT') {
    let selectedTime = e.target.getAttribute('data-day-and-time');
    let selectedCost = parseInt(e.target.getAttribute('data-cost'));
    console.log(selectedCost);
    if (e.target.checked) {
      activitiesCost += selectedCost;
      cost.innerHTML = `Total costs: ${activitiesCost}`;
    }
    if (!e.target.checked) {
      activitiesCost -= selectedCost;
      cost.innerHTML = `Total costs: ${activitiesCost}`;
    }

    /* activities is a nodelist of all the checkboxs */
    for (let i = 0; i < activities.length; i++) {
      let listOfActivitiesTime = activities[i].getAttribute(
        'data-day-and-time'
      );

      if (e.target !== activities[i]) {
        if (selectedTime == listOfActivitiesTime && !activities[i].disabled) {
          activities[i].disabled = true;
          cost.innerHTML = `Total costs: ${activitiesCost}`;

          activityToolTip.textContent =
            "This activity conflicts with another activity which we've disabled";
          activityToolTip.classList.add('tooltip1');
          activities[i].parentElement.appendChild(activityToolTip);
          activities[i].parentElement.classList.add('Tooltip-parent1');
          activityToolTip.style.display = 'block';
          setTimeout(() => (activityToolTip.style.display = 'none'), 2000);
        } else if (
          selectedTime == listOfActivitiesTime &&
          activities[i].disabled
        ) {
          console.log('this conflicts');
          activities[i].disabled = false;

          let disabledActivityCost = parseInt(
            activities[i].getAttribute('data-cost')
          );
          cost.innerHTML = `Total costs: ${activitiesCost}`;
          activityToolTip.textContent = 'Activity conflict resolved';
          console.log(activityToolTip);
          activityToolTip.style.display = 'block';
          setTimeout(() => (activityToolTip.style.display = 'none'), 2000);
        }
      }
    }
  }
});

/* Section to select the payment */

payment[1].setAttribute('selected', 'true');

paymentParent.addEventListener('change', (e) => {
  console.log(e.target.value);
  if (e.target.value == 'bitcoin') {
    console.log('same');
    creditcardSection.style.display = 'none';
    paypalSection.style.display = 'none';
    bitcoinSection.style.display = 'block';
  }
  if (e.target.value == 'paypal') {
    creditcardSection.style.display = 'none';
    paypalSection.style.display = 'block';
    bitcoinSection.style.display = 'none';
  }
  if (e.target.value == 'credit card') {
    creditcardSection.style.display = 'block';
    paypalSection.style.display = 'none';
    bitcoinSection.style.display = 'none';
  }
});
/* form validation using regular expressions */
function formValidation() {
  let okToSubmit = true;
  /* name validation */

  let name = document.querySelector('#name');
  name.classList.remove('error');
  let nameVal = /[\w]/.test(name.value);

  if (!nameVal) {
    name.classList.add('error');
    okToSubmit = false;
  }
  /* email validation */
  email.classList.remove('error');
  let emailVal = /^[^@]+@[^@.]+\.[a-z]+$/i.test(email.value);
  if (!emailVal) {
    email.classList.add('error');
    okToSubmit = false;
  }

  /* Job role other input */

  otherJobInput.classList.remove('error');
  if (jobroleParent.value == 'other') {
    if (otherJobInput.value == '') {
      otherJobInput.classList.add('error');
      okToSubmit = false;
    }
  }

  /* design validation */
  designOptions.classList.remove('error');
  let chosenColor = document.querySelector('#color');
  if (chosenColor[0].style.display !== 'none') {
    designOptions.classList.add('error');
    okToSubmit = false;
  }

  /*checking if any activities selections have been made */
  activitiesParent.classList.remove('error');
  if (activitiesCost < 100) {
    activitiesParent.classList.add('error');
    okToSubmit = false;
  }

  /* This will valid the credit card details if a 
    credit card has been chosen by method of payment */
  paymentParent.classList.remove('error');
  if (paymentParent.value == 'select method') {
    paymentParent.classList.add('error');
    okToSubmit = false;
  }

  if (paymentParent.value == 'credit card') {
    let cardNumber = document.querySelector('#cc-num');
    cardNumber.classList.remove('error');
    let cardVal = /^\d{13,16}$/.test(cardNumber.value);
    console.log(cardVal);
    if (!cardVal) {
      cardNumber.classList.add('error');
      okToSubmit = false;
    }
    let zipCode = document.querySelector('#zip');
    zipCode.classList.remove('error');
    console.log(zipCode.value);
    let zipVal = /^\d{5}$/.test(zipCode.value);
    if (!zipVal) {
      zipCode.classList.add('error');
      okToSubmit = false;
      console.log('please enter 5 digits thanks');
    }

    let cvvCode = document.querySelector('#cvv');
    cvvCode.classList.remove('error');
    let cvvVal = /^\d{3}$/.test(cvvCode.value);
    if (!cvvVal) {
      console.log('error');
      cvvCode.classList.add('error');
      okToSubmit = false;
      console.log('please enter 3 digits thanks');
    }
  }
  return okToSubmit;
}
/* Submit button, i am running a formValidation function which will 
 prevent the form from submitting if the validation returns false.*/

registerButton.addEventListener('click', (e) => {
  if (!formValidation()) {
    e.preventDefault();
  }
});
