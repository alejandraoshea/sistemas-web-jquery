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

  $("#registerForm").on("submit", function(e){
    e.preventDefault();
    cleanMistakes();
    $("#message").fadeOut(200).text("");

    const name = $("#name").val().trim();
    const email = $("#email").val().trim();
    const phoneNumber = $("#phone-number").val().trim();
    const password = $("#password").val().trim();

    let valid = true;

    // Nombre y apellido (acepta acentos y apóstrofes)
    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ'-]+(\s+[A-Za-zÁÉÍÓÚáéíóúÑñ'-]+)+$/;
    if (!nameRegex.test(name)) {
      showError("#error-name", "It must only contain letters and include both name and surname.");
      valid = false;
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showError("#error-email", "Email format invalid.");
      valid = false;
    }

    // Teléfono: exactamente 9 números
    const phoneNbRegex = /^\d{9}$/;
    if (!phoneNbRegex.test(phoneNumber)) {
      showError("#error-phone-number", "Only 9 numbers are allowed (no spaces).");
      valid = false;
    }

    // Contraseña
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passRegex.test(password)) {
      showError("#error-password", "At least 8 characters, one uppercase, one lowercase, and one number.");
      valid = false;
    }

    if (valid) {
      $("#message").text("✅ Register completed correctly.").fadeIn(300);
      $("#registerForm")[0].reset();
    }
  });

  function showError(id, message) {
    $(id).text(message);
  }

  function cleanMistakes() {
    $(".error").text("");
  }

});
