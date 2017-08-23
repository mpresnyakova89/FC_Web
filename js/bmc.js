var LOGIN_CHECK_URL = '/site/webapi/getLoginUrl';
var SELECTORS = {
  LOGIN_BUTTON: '.js_loginButton',
  TYPE_WATCH_FIELDS: '#js_email, #js_password',
  LOGIN_FORM: '.js_loginForm',
  EMAIL_LABEL: '.js_emailLabel',
  ERROR_MESSAGE: '.js_errorMessage',
  REGISTER_ERROR_MESSAGE: '.register_errorMessage',
  EMAIL_INPUT: '#js_email',
  PASSWORD_INPUT: '#js_password',
  REMEMBER_ME: '#js_rememberMe',
  ENTRY_FORM: '#js_entryForm',
  ENTRY_FORM_EMAIL_INPUT: '#js_entryFormEmail',
  ENTRY_FORM_PASSWORD_INPUT: '#js_entryFormPassword',
	ENTRY_FORM_REMEMBER_ME: '#js_entryFormRememberMe',
	ETH_WALLET_INPUT: '#eth_wallet',
	REGISTER_BUTTON: '#register-button',
	PREORDER_ERROR_FIELD: '#preorder-error',
	PREORDER_SUCCESS_FIELD: '#preorder-error',
	PREORDER_FORM: '#preorder-form',
};

function loginFormClear() {
  $(SELECTORS.EMAIL_INPUT).val('');
  $(SELECTORS.PASSWORD_INPUT).val('');
  $(SELECTORS.ERROR_MESSAGE).hide();
  $(SELECTORS.EMAIL_LABEL).removeClass('invalid');
  $(SELECTORS.EMAIL_INPUT).removeClass('invalid');
  enableLoginButton();
}

function disableLoginButton() {
  $(SELECTORS.LOGIN_BUTTON).addClass('button-alt');
  $(SELECTORS.LOGIN_BUTTON).prop('disabled', true);
  $(SELECTORS.LOGIN_BUTTON).html('Login or password incorrect');
}

function enableLoginButton() {
  "use strict";

  $(SELECTORS.LOGIN_BUTTON).removeClass('button-alt');
  $(SELECTORS.LOGIN_BUTTON).prop('disabled', false);
  $(SELECTORS.LOGIN_BUTTON).html('Login');
}


$(document).ready(function(){

  $('#burger').on('click', function() {
    $('#main-nav').addClass('active');
  });
  $('#main-nav').on('click', '.close', function() {
    $('#main-nav').removeClass('active');
  });


  $('.popup').on('click', '.close', function() {
    $('.popup').removeClass('active');
    loginFormClear();
	});

	$(SELECTORS.REGISTER_BUTTON).on('click', function(e) {
		e.preventDefault();
		registerUser();
	});

	$('.popup-opener').on('click', function() {
    loginFormClear();
    $($(this).attr('href')).addClass('active').siblings('.popup').removeClass('active');
    return false;
	});




});


