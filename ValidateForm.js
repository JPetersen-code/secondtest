/**Declare function validateNonEmpty
 *
 * @param {*} tf
 * @param {*} helpText
 */
function validateNonEmpty(tf, helpText) {
  //tf = input to validate, helpText = span to display validation message
  //get the value from the input element
  var value = tf.value;

  //check if the value is missing
  if (value) {
    //value is not empty (not "")
    tf.className = "valid";
    helpText.innerHTML = "";
    return true; //valid
  } else {
    tf.className = "invalid";
    helpText.innerHTML = "Empty input";
    return false; //invalid
  }
}
/** Declare function validateTwoDigits
 *
 * @param {*} tf
 * @param {*} helpText
 */
function validateTwoDigits(tf, helpText) {
  var isNotEmpty = validateNonEmpty(tf, helpText);
  if (isNotEmpty == false) {
    //empty value
    return false;
  }
  var value = tf.value;
  var regex = /(?=.*[a-z])(?=.*[A-Z])/;

  var is2Digits = regex.test(value);
  if (is2Digits) {
    tf.className = "valid UserNme";
    helpText.innerHTML = "";
    return true; //valid
  } else {
    tf.className = "invalid";
    helpText.innerHTML = "Invalid userName";
    return false; //invalid
  }
}

var notEmptyEmail = false;
function validateEmail(tf, helpText) {
  if (validateNonEmpty(tf, helpText)) {
    notEmptyEmail = true;
  }

  //tf = input to validate, helpText = span to display validation message
  //get the value from the input element

  var value = tf.value;
  var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{​​|}​​~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  var isEmail = regex.test(value);
  if (isEmail) {
    tf.className = "valid email";
    helpText.innerHTML = "";
    return true; //valid
  } else {
    //value is email
    tf.className = "invalid";
    helpText.innerHTML = "Invalid email";
    return false; //invalid
  }
}
/**
 * Declare Function validateOnlyDigits
 * @param {*} tf
 * @param {*} helpText
 */
var notEmptyPhone = false;
function validateOnlyDigits(tf, helpText) {
  if (validateNonEmpty(tf, helpText)) {
    notEmptyPhone = true;
  }

  /**
   * declare variabl value has te tf value
   */
  var value = tf.value;
  var regex = /^[0-9]+$/;

  var isDigits = regex.test(value);
  if (isDigits) {
    tf.className = "valid";
    helpText.innerHTML = "";
    return true; //valid
  } else {
    //value is not 4 digits
    tf.className = "invalid";
    helpText.innerHTML = "digits only";
    return false; //invalid
  }
}
/**
 * Declare fution validateAll
 * @param {*} form
 */
function validateAll(form) {
  var success = true;
  if (!(notEmptyEmail || notEmptyPhone)) {
    document.getElementById("invalidEmail").innerHTML =
      "Missing inputs must have either email or phone number input";
    document.getElementById("invalidPhoneNumber").innerHTML =
      "Missing inputs must have either email or phone number input";
    success = false;
    document.getElementById("invalidEmail").className = "invalid";
    document.getElementById("invalidPhoneNumber").className = "invalid";
  }

  var i = 0;
  while (i < form.elements.length) {
    var e = form.elements[i];
    switch (i) {
      case 0:
        success = e.onblur() && success;
        i++;
        break;
      case 1:
        if (notEmptyEmail) {
          success = e.onblur() && success;
        }
        i++;
        break;
      case 2:
        if (notEmptyPhone) {
          success = e.onblur() && success;
        }
        i++;
        break;
      case 3:
        success = e.onblur() && success;
        i++;
        break;
      default:
        i++;
        break;
    }
  }

  return success;
}
