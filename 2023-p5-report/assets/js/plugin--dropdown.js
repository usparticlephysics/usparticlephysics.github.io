/**
  * Dropdown
  *
  * @description
  *
  * @param  config         An object of configuration settings:
  *
  *
  * @return new instance of AppendText
  */




/*
// Config defaults and init
// ----------------------------------------------------------------------------
*/

var Dropdown = function (config) {
  this.hook = config.hook || 'js-drop';
  this.menu = config.menu;
  this.event = config.event || 'hover';
  this.pane = document.getElementById(this.menu);
  this.trigger = document.getElementById(this.hook); 
  this.bgSwitch = document.getElementById('js-bg-offswitch'); 
}


Dropdown.prototype.init = function() {
  this.modifyHooks(this.hook, this.addListener.bind(this, this.event));
}




/*
// Shared methods
// ----------------------------------------------------------------------------
*/

Dropdown.prototype.modifyHooks = function(hook, func) {
  var elem = document.getElementById(hook); 
  func(elem);
}


Dropdown.prototype.addListener = function(event, elem) {
  document.addEventListener("click", function(e) { 
    this.toggleMenu(document, e); 
    this.toggleTrigger(document, e);
  }.bind(this), false);
}



Dropdown.prototype.toggleMenu = function(elem, event) { 
  if (event.target.closest('#toggle-menu')) {
    if (this.pane.classList.contains('js-dropdown-hidden')) {
      this.pane.classList.replace('js-dropdown-hidden', 'js-dropdown-visible');
    } else if (this.pane.classList.contains('js-dropdown-visible')) {
      this.pane.classList.replace('js-dropdown-visible', 'js-dropdown-hidden');
    } 
    } else if (this.pane.classList.contains('js-dropdown-visible')) {
      this.pane.classList.replace('js-dropdown-visible', 'js-dropdown-hidden');
    } 
  return false;
}



Dropdown.prototype.toggleTrigger = function(elem, event) {
  if (this.trigger.classList.contains('js-ddtrigger-closed')) {
    this.trigger.classList.replace('js-ddtrigger-closed', 'js-ddtrigger-open');
    document.body.className += 'stop-scroll';
    document.documentElement.className += 'stop-scroll';
    // document.body.addEventListener('touchmove', function(e){e.preventDefault()}, false);
    document.body.addEventListener('touchmove', function(e){e.preventDefault()});
  } else if (this.trigger.classList.contains('js-ddtrigger-open')) {
    this.trigger.classList.replace('js-ddtrigger-open', 'js-ddtrigger-closed');
    document.body.classList.remove('stop-scroll');
    document.documentElement.classList.remove('stop-scroll');
    document.body.removeEventListener('touchmove', function(e){e.preventDefault()});
  } 
  return false;
}