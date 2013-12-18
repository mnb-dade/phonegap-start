//= require jquery
//= require bootstrap
//= require_tree .

$(function(){
  document.addEventListener("deviceready", onDeviceReady, false);
});

function onDeviceReady(){
  // Listen for backbutton
  document.addEventListener("backbutton", onBackKeyDown, false);
  
  // Load Menu
  $('#menu-placeholder').load("pages/menu.html", function(){
    bindPageLinks();
  });

  // Workaround for navbar bug on orientation change
  $(window).bind('resize', function() {  
    $('#main-navbar').css('width', $('body').css('width'));
  }).trigger('resize');
  
  // Eliminate the 300ms delay after physical taps
  FastClick.attach(document.body);
  
  bindPageLinks();
}

function onBackKeyDown(){
  $('.navbar-brand.page-link').trigger('click');
}

function bindPageLinks(){
  $('a.page-link').unbind('click').on('click', function(event){
    var page = $(this).data('page');
    var callback = $(this).data('callback');
    event.preventDefault();
    if(page) loadPage(page, callback);
  });
}

function loadPage(page, callback){
  var container = $('#main-container');
  container.load(page, function(){
    bindPageLinks();
    if(callback) eval(callback);
  });
}