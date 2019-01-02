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
    document.getElementById('apodTitle').innerHTML = result.title;
    if (result.media_type === 'video') {
      document.getElementById('apodImg').style.display = "none";
      document.querySelector('#apodVideo > iframe').style.display = "block";
      document.querySelector('#apodVideo > iframe').src = result.url;
    } else {
      document.getElementById('apodVideo').style.display = "none";
      document.getElementById('apodImg').style.display = "block";
      document.getElementById('apodImg').src = result.url;
      document.getElementById('apodImg').alt = result.title;
    }
    if (result.copyright != undefined){
      document.getElementById('apodCopyright').innerHTML = 'Copyright: ' + result.copyright;
    }
    document.getElementById('apodDate').innerHTML = 'Date: ' + result.date;
    document.getElementById('apodDesc').innerHTML = result.explanation;
    console.log(result);
  },

  // Application Constructor
  getRequest: function() {
    let _this = this;
    let date = this.randomDate(new Date(1995,5,16), new Date());
    let key = 'c6S6BLrhl1HmY7nxqtFgorHBQwXCXviMSQNY4m7L'
    var url = `https://api.nasa.gov/planetary/apod?api_key=${key}&date=${date}`;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();

    xhr.onload = function() {
      let result = JSON.parse(xhr.response);
      _this.buildDOM(result);
    }
  },

  init: function() {
    this.getRequest();
  }
};

apod.init();

document.getElementById('btnRandApod').addEventListener('click', function(){
  apod.getRequest();
});
