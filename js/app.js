$(document).ready(function () {

  $("#btn-email, #btn-phone-num").on("click", function (e) {
    e.preventDefault();
    const element = document.querySelector(".active");
    if(element !== null){
      element.classList.remove("active");
    }
    e.target.className +=  " active";
    const placeholder = (e.target.id == 'btn-email') ? 'Enter an email address' : 'Enter a phone number';
   $('.form-control')[0].placeholder = placeholder;
   $('.form-control')[0].value = '';
  });

  $("#btn-search").on("click", function (e) {
    e.preventDefault();
    localStorage.clear(); //Clears storage for next request

    const element = document.querySelector(".active");
    const text = $('input[type="text"]').val().toLowerCase();

    const valid = isValid(element, text);
    fetchResults(text, element, valid) ;
  });

  $('input[type="text"]').keypress(function (event) {
    const element = document.querySelector(".active");
    const text = $('input[type="text"]').val().toLowerCase();

    const valid = isValid(element, text);
    keycode = (event.keyCode ? event.keyCode : event.which); 
    if (keycode == '13') { //On click Enter
      /**
       * Makes a request to ltv API to search an specific email address.
       * If there's a response, it gets stored in the local storage and redirects to results page
       */
      event.preventDefault();
      localStorage.clear(); //Clears storage for next request
      fetchResults(text, element, valid) 
    }
  });

  const fetchResults = (text, element, valid) => {
    if (valid) {
      const param = (element.id == 'btn-email') ? 'email=' : 'phone=';
      const url = 'https://ltv-data-api.herokuapp.com/api/v1/records.json?' + param + text;
      document.querySelector('input[type="text"]').parentNode.classList.remove("error");
      const proxyurl = "";
      fetch(proxyurl + url)
        .then((response) => response.text())
        .then(function (contents) {
          localStorage.setItem("userObject", contents);
          window.location.href = "result.html";
        })
        .catch((e) => console.log(e));
    } else {
      const errorMsg = (element.id == 'btn-email') ? 'Please enter a valid email address' : 'Please enter a valid phone number';
      $('.error-msg').text(errorMsg);
      document.querySelector('input[type="text"]').parentNode.classList.add("error");
    }
  }

  const isValid = (element, text) =>{
    const validPhoneNo = /^\d{10}$/;
    const validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const regEx = (element.id == 'btn-email') ? validEmail : validPhoneNo;

    let valid = false;
    if (text.match(regEx)) {
      valid = true;
      document.querySelector('input[type="text"]').parentNode.classList.remove("error");
    }
    return valid; 
  }

});
