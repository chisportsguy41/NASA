var apod = {

  randomDate: function(start, end){
    //Randomize the date https://gist.github.com/miguelmota/5b67e03845d840c949c4
    let date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    //let date = new Date(2007,11,2);

    //Format the date
    let d = date.getDate();
    let m = date.getMonth() + 1; //In JS months start at 0
    let y = date.getFullYear();

    //Change the month and day strings so that they match the documented format.
    if(m < 10){
      m = '0'+m
    }

    if(d < 10){
      d = '0'+d
    }

    return `${y}-${m}-${d}`;
  },

  buildDOM: function(result) {
    $('#apodTitle').text(result.title);
    if (result.media_type === 'video') {
      $('#apodImg').hide();
      $('#apodVideo > iframe').attr('src', result.url).show();
    } else {
      $('#apodVideo').hide();
      $('#apodImg').attr('src', result.url).attr('alt', result.title).show();
    }
    if (result.copyright != undefined){
      $('#apodCopyright').text('Copyright: ' + result.copyright);
    }
    $('#apodDate').text('Date: ' + result.date);
    $('#apodDesc').text(result.explanation);
    console.log(result);
  },

  // Application Constructor
  getRequest: function() {
    let _this = this;
    let date = this.randomDate(new Date(1995,5,16), new Date());
    let key = 'c6S6BLrhl1HmY7nxqtFgorHBQwXCXviMSQNY4m7L'
    var url = `https://api.nasa.gov/planetary/apod?api_key=${key}&date=${date}`;
    $.ajax({
      url: url
    }).done(function(result){
      _this.buildDOM(result);
    }).fail(function(result){
      console.log(result);
    });
  },

  init: function() {
    this.getRequest();
  }
};

apod.init();

$(function() {
  $('#btnRandApod').on('click', function(){
    apod.getRequest();
  });
});
