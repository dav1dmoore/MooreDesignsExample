$(function(){
  $('.hamburgerOpen').on('click', function(e){
    e.preventDefault();
    $('.modalNav').fadeIn(900);
    $('.modalNav').css('display', 'flex');
  });
});

$(function(){
  $('.hamburgerClose').on('click', function(e){
    e.preventDefault();
    $('.modalNav').fadeOut(900);
  });
});

// Slider Script
//Create variables
var $test1;

$('.slider').each(function(){
  var $this = $(this);
  var $group = $this.find('.slide-group');
  var $slides = $this.find('.slide');
  var buttonArray = [];
  var currentIndex = 0;
  var timeout;
// Move function

function move(newIndex){
  var animateLeft, slideLeft;

  advance ();

  if ($group.is(':animated') || currentIndex === newIndex){
    return;
  }

  buttonArray[currentIndex].removeClass('active');
  buttonArray[newIndex].addClass('active');

  if (newIndex >  currentIndex){
    slideLeft = '100%';
    animateLeft = '-100%';
  } else {
    slideLeft = '-100%';
    animateLeft = '100%';
  }

  $slides.eq(newIndex).css( {
    left: slideLeft,
    display: 'block'
  });

  $group.animate( {left: animateLeft}, function(){
    $slides.eq(currentIndex).css( {display:'none'});
    $slides.eq(newIndex).css({left:0});
    $group.css({left:0});
    currentIndex = newIndex;
  });
}


function advance (){
  clearTimeout(timeout);
  timeout = setTimeout(function(){
    if (currentIndex < ($slides.length - 1)){
      move(currentIndex + 1);
    } else {
      move(0);
    }
  }, 5000);
  $test1 = $slides[currentIndex];
  }

    $.each($slides, function(index){
      var $button = $('<button type="button" class="slide-btn"></button>');
      if (index === currentIndex){
        $button.addClass('active');
      }
      $button.on('click', function(){
        move(index);
      }).appendTo('.slide-buttons');
      buttonArray.push($button);
    });
    advance();
});

// Current Page Script

const $thisPage = document.location.href;
const $currentPage = $thisPage.match(/[^\/]+$/)[0];
const $thisLink = $('nav>ul>li>a');
const $modalLink = $('.modalNav ul a')

$thisLink.each(function(){
  $link = $(this).attr('href');
  if ($link === $currentPage){
    $(this).attr('id', 'selected');
  } else {
    return;
  }
});

$modalLink.each(function(){
  $link = $(this).attr('href');
  if($link === $currentPage){
    $(this).attr('id','modalSelected');
  } else {
    return;
  }
})


//Form Validation

// save reference to input elements
const firstNameEl = document.querySelector("#first-name");
const lastNameEl = document.querySelector("#last-name");
const emailEl = document.querySelector("#email");
const telEl = document.querySelector("#phone");
const siteEl = document.querySelector("#site");

/*
  returns and object that uses the element's id attribute as a key and the error
  message as the value
*/
function getFormErrors() {
  const errors = {};
  const numericVal = /\d/;
  const emailVal = /\w+@\w+\.\D{3}/;
  const telVal = /\d/;
  const siteVal = /\D+[\.]\D+/;
  if (firstNameEl.value.length < 1 || firstNameEl.value.length > 10) {
    errors[firstNameEl.id] = "First name must be between 1 and 10 characters.";
  }
  if (lastNameEl.value.length < 1 || lastNameEl.value.length > 10) {
    errors[lastNameEl.id] = "Last name must be between 1 and 10 characters.";
  }
  if (numericVal.test(firstNameEl.value)) {
    errors[firstNameEl.id] = "First name must contain only alpha characters.";
  }
  if (numericVal.test(lastNameEl.value)) {
    errors[lastNameEl.id] = "Last name must contain only alpha characters.";
  }
  if (!emailVal.test(emailEl.value)) {
    errors[emailEl.id] = "Email must be properly formatted: x@x.xxx";
  }
  if (!telVal.test(telEl.value) || telEl.value.length < 9){
    errors[telEl.id] = "Telephone number must be digits only.";
  }
  if (!siteVal.test(siteEl.value)) {
    errors[siteEl.id] = "Company website must be formatted www.xxx.xx";
  }
  return errors;
}

/*
  removes all of the error messages from the form
*/
function clearFormErrors() {
  const errorEls = document.querySelectorAll(`[id$='err']`);
  // loop through all of the error elements and clear the text content
  for (let i = 0; i < errorEls.length; i++){
    errorEls[i].innerText = "";
}
}

// clear form values
function clearFormValues() {
  const inputClr = document.querySelectorAll("input");
  const textAreaClr = document.querySelector("textarea");
  // loop through all of the error elements and clear the text content
  for (let i = 0; i < inputClr.length - 1; i++){
    inputClr[i].value = "";
}
textAreaClr.value = "";

}

const userObj = {}
function getFormValues() {
  userObj.firstName = firstNameEl.value;
  userObj.lastName = lastNameEl.value;
  userObj.emailAddress = emailEl.value;
  return userObj;
}

function displayFormErrors(errors) {
  for (const errorField of Object.keys(errors)) {
    const errorEl = document.querySelector(`#${errorField}-err`);
    // append text node
    errorEl.append(errors[errorField]);
  }
}

function submitForm(event) {
  event.preventDefault();
  clearFormErrors();
  const errors = getFormErrors();
  if (Object.keys(errors).length === 0) {
    clearFormValues();
  } else {
    displayFormErrors(errors);
  }
}
