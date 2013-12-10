//= require jquery
//= require bootstrap
//= require_tree .

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        deviceReady();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = $(id);
        var listeningElement = $('.listening');
        var receivedElement = $('.received');

        listeningElement.attr('style', 'display:none;');
        receivedElement.attr('style', 'display:inline-block;');

        console.log('Received Event: ' + id);
    }
};

function deviceReady(){
  $(function() {
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
  });
}

function bindPageLinks(){
  $('a.page-link').on('click', function(event){
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