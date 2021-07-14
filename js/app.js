$(document).ready(function () {

  $("#btn-email, #btn-phone-num").on("click", function (e) {
    e.preventDefault();
    var element = document.querySelector(".active");
    if(element !== null){
      element.classList.remove("active");
    }
    e.target.className +=  " active";
    var placeholder = (e.target.id == 'btn-email') ? 'Enter an email address' : 'Enter a phone number';
   $('.form-control')[0].placeholder = placeholder;
  });

  $("#btn-search").on("click", function (e) {
    e.preventDefault();
    localStorage.clear(); //Clears storage for next request
    var element = document.querySelector(".active");

    var validPhoneNo = /^\d{10}$/;
    var validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    regEx = (element.id == 'btn-email') ? validEmail : validPhoneNo;

    text = $('input[type="text"]').val().toLowerCase();
    var valid;
    if (text.match(regEx)) {
      valid = true;
    } else {
      valid = false;
    }

    if (valid) {
      const param = (element.id == 'btn-email') ? 'email=' : 'phone=';
      let url = 'https://ltv-data-api.herokuapp.com/api/v1/records.json?' + param + text;
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
  });

  $('input[type="text"]').keypress(function (event) {
    email = $('input[type="text"]').val().toLowerCase();
    regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (email.match(regEx)) {
      x = true;
      document.querySelector('input[type="text"]').parentNode.classList.remove("error");
    } else {
      x = false;
    }
    keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
      /**
       * Makes a request to ltv API to search an specific email address.
       * If there's a response, it gets stored in the local storage and redirects to results page
       */
      event.preventDefault();
      localStorage.clear(); //Clears storage for next request

      var x, y;


      if (x === true) {
        const proxyurl = "";
        const url =
          'https://ltv-data-api.herokuapp.com/api/v1/records.json?email=' + email;
        fetch(proxyurl + url)
          .then((response) => response.text())
          .then(function (contents) {
            localStorage.setItem("userObject", contents);
            window.location.href = "result.html";
          })
          .catch((e) => console.log(e));
      } else if (x !== true) {
        document.querySelector('input[type="text"]').parentNode.classList.add("error");
      }
    }
  });

});
