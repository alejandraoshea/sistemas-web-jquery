$(document).ready(function(){

  $("#btn-register").on("click", function(){
    $("#main-container").fadeOut(300, function(){
      $("#form-container").fadeIn(300);
    });
  });

  $("#cancel").on("click", function(){
    $("#registerForm")[0].reset();
    cleanMistakes();
    $("#message").fadeOut(200).text("");
    $("#form-container").fadeOut(300, function(){
      $("#main-container").fadeIn(300);
    });
  });

  $("#name").on("input", validateName);
  $("#email").on("input", validateEmail);
  $("#phone-number").on("input", validatePhone);
  $("#password").on("input", validatePassword);

  $("#registerForm").on("submit", function(e){
    e.preventDefault();
    cleanMistakes();
    $("#message").fadeOut(200).text("");

    const valid = validateName() & validateEmail() & validatePhone() & validatePassword();

    if(valid){
      $("#message").text("✅ Register completed correctly.").fadeIn(300);
      $("#registerForm")[0].reset();
    }
  });

  function validateName(){
    const name = $("#name").val().trim();
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ'-]+(\s+[A-Za-zÁÉÍÓÚáéíóúÑñ'-]+)+$/;
    if(!regex.test(name)){
      showError("#error-name","It must only contain letters and include both name and surname.");
      return false;
    } else {
      $("#error-name").fadeOut(100).text("");
      return true;
    }
  }

  function validateEmail(){
    const email = $("#email").val().trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!regex.test(email)){
      showError("#error-email","Email has to contain @ and a dot");
      return false;
    } else {
      $("#error-email").fadeOut(100).text("");
      return true;
    }
  }

  function validatePhone(){
    const phone = $("#phone-number").val().trim();
    const regex = /^\d{9}$/;
    if(!regex.test(phone)){
      showError("#error-phone-number","Only 9 numbers are allowed (no spaces).");
      return false;
    } else {
      $("#error-phone-number").fadeOut(100).text("");
      return true;
    }
  }

  function validatePassword(){
    const password = $("#password").val().trim();
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if(!regex.test(password)){
      showError("#error-password","At least 8 characters, one uppercase, one lowercase, and one number.");
      return false;
    } else {
      $("#error-password").fadeOut(100).text("");
      return true;
    }
  }

  function showError(id,message){
    $(id).fadeIn(100).text(message);
  }

  function cleanMistakes(){
    $(".error").fadeOut(100).text("");
  }

});
