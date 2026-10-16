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

var Panorama = function (config) {
  this.hook = config.hook || 'js-panorama';
  this.eventA = config.eventA || 'mousemove';
  this.eventB = config.eventB || 'mouseenter';
  this.eventC = config.eventC || 'mouseleave';
}


Panorama.prototype.init = function() {
  this.modifyHooks(this.hook, this.addListener.bind(this, this.eventA));
  this.modifyHooks(this.hook, this.addListener.bind(this, this.eventB));
  this.modifyHooks(this.hook, this.addListener.bind(this, this.eventC));
}




/*
// Shared methods
// adapted from: https://jsfiddle.net/os0moz5j/1/
// ----------------------------------------------------------------------------
*/


Panorama.prototype.modifyHooks = function(hook, func) {
  this.elem = document.getElementsByClassName(hook); 
  this.elem = this.elem[0]; 
  func(this.elem);
}

Panorama.prototype.addListener = function(event, elem) {
    if(event == 'mousemove'){
      elem.addEventListener(event, function(e) {
          this.ImgX(e);
      }.bind(this), false);
    } else {
      elem.addEventListener(event, function(e) {
          this.defaultToggle(event);
      }.bind(this), false);
    }
}

Panorama.prototype.ImgX = function(e) {
    let img = this.elem.children[0];
    let mousePos = e.pageX - this.elem.offsetLeft; 
    let eleWidth = this.elem.offsetWidth;
    let imgWidth = img.offsetWidth;
    let relativeMousePos = mousePos / eleWidth;
    let imgPos = (imgWidth - eleWidth) * relativeMousePos;
    if(imgPos > document.body.clientWidth/2) {
      imgPos = document.body.clientWidth/2;
    }
    else {
      img.style['transform'] = 'translateX(-'+imgPos+'px)';
    }
}

Panorama.prototype.defaultToggle = function(e) {
    if(e == 'mouseenter') {
      this.elem.classList.remove("hero-home_default");
    } 
    else if(e == 'mouseleave') {
      this.elem.classList.add("hero-home_default");
      let img = this.elem.children[0];
      img.style['transform'] = 'translateX(-50%)';
    } 
}


  
