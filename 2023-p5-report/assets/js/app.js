


/*
// Include drop downs
// ----------------------------------------------------------------------------
// var dropdowns = document.getElementsByClassName('js-drop');

// if (dropdowns.length > 0) {
// 	var menus = [];

// 	Array.prototype.forEach.call(dropdowns, function(el) {
// 		menus.push(new Dropdown({'hook': el.id, 'menu': el.dataset.menu}));	
// 	});

// 	Array.prototype.forEach.call(menus, function(m) {
// 		m.init();
// 	}); 
// }
*/


/*
// Include panoramic image effect
// ----------------------------------------------------------------------------
*/
// var panoramic_img = document.getElementsByClassName('js-panorama');

// if (panoramic_img.length > 0) {
// 	const panorama = new Panorama({});
// 	panorama.init();
// }



/*
// Include drop downs
// ----------------------------------------------------------------------------
*/
var dropdownsClick = document.getElementsByClassName('js-drop-click');

if (dropdownsClick.length > 0) {
	var menus = [];

	Array.prototype.forEach.call(dropdownsClick, function(el) {
		menus.push(new Dropdown({'hook': el.id, 'menu': el.dataset.menu, 'event': 'click'}));	
	});

	Array.prototype.forEach.call(menus, function(m) {
		m.init();
	}); 
}



/*
// Sticky section headers
// ----------------------------------------------------------------------------
*/

if ( document.body.classList.contains('home') ){
	const sensor = document.getElementById("js-sticky-sensor");
	const target = document.querySelector(".js-sticky-head");
	const observer = new IntersectionObserver( 
		([e]) => target.classList.toggle("is-pinned", e.intersectionRatio < 1),//e.target.classList.toggle("is-pinned", e.intersectionRatio < 1),
	  { threshold: [1] }
	);

	observer.observe(sensor);
}


/*
// Remove line breaks after span elements
// ----------------------------------------------------------------------------
*/

// Get all the glossary items
// replace linebreaks with empty string

const terms = document.getElementsByClassName('jekyll-glossary');
for (let i of terms) {
	if (i.nextSibling != null) {
		i.nextSibling.textContent = i.nextSibling.textContent.replace(/\n/g, '');
	}  
}


/*
// Add mobile search class depending on window size
// ----------------------------------------------------------------------------
*/

function mobileSearchToggle(x) {
  if (x.matches) { 
    document.body.classList.add("mobile-search");
  } else {
  	// if(element.classList.contains(class)) {
    	document.body.classList.remove("mobile-search");
    // }
  }
}

// Create a MediaQueryList object
let x = window.matchMedia("(max-width: 992px)")

// Call listener function at run time
mobileSearchToggle(x);

// Attach listener function on state changes
x.addEventListener("change", function() {
  mobileSearchToggle(x);
}); 




/*
// Add mobile search class depending on window size
// ----------------------------------------------------------------------------
*/

function positionSidebarHits() {
	let sbar = document.getElementById('search-sidebar-searchbar');
	if (sbar) {
		let sbarBottom = sbar.getBoundingClientRect().bottom;
		let hits = document.getElementById('search-sidebar-hits');
		let hitsHeight = 400;
		hits.style.top = sbarBottom - hitsHeight - 80 + "px";
	}	
}

function throttle(fn, wait) {
  var time = Date.now();
  return function() {
    if ((time + wait - Date.now()) < 0) {
      fn();
      time = Date.now();
    }
  }
}

// add listeners
if( document.body.classList.contains('home') || document.body.classList.contains('mobile-search') ) {
	
} else {
	positionSidebarHits();
	let sidebar = document.getElementById('nav-sidebar');
	sidebar.addEventListener('scroll', throttle(positionSidebarHits, 10));
}






