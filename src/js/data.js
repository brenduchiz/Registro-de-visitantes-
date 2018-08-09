window.client = {
  register: () => { },
  photo: () => {
    (() => {
      let streaming = false,
        video = document.querySelector('#video'),
        canvas = document.querySelector('#canvas'),
        startbutton = document.querySelector('#startbutton'),
        width = 320,
        height = 0;

      navigator.getMedia = (navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia);

      navigator.getMedia(
        {
          video: true,
          audio: false
        },
        (stream) => {
          if (navigator.mozGetUserMedia) {
            video.mozSrcObject = stream;
          } else {
            let vendorURL = window.URL || window.webkitURL;
            video.src = vendorURL.createObjectURL(stream);
          }
          video.play();
        },
        (err) => {
          console.log('An error occured! ' + err);
        }
      );

      video.addEventListener('canplay', event => {
        if (!streaming) {
          height = video.videoHeight / (video.videoWidth / width);
          video.setAttribute('width', width);
          video.setAttribute('height', height);
          canvas.setAttribute('width', width);
          canvas.setAttribute('height', height);
          streaming = true;
        }
      }, false);

      const takepicture = () => {
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(video, 0, 0, width, height);
        let finalPhoto = canvas.toDataURL('image/png');
        return finalPhoto;
      };

      startbutton.addEventListener('click', event => {
        takepicture();
        event.preventDefault();
      }, false);
    })
    ();
  }
};

window.admin = {
  stats: () => { }
};