(function() {
  const DATA_URL = '//cdn.durka.plez.me/images.php';

  let seed = (new Date()).valueOf();
  function randomString(seed) {
    seed++;
    return (Math.random() + parseFloat('0.' + String(seed))).toString(36).substring(2, 15);
  }

  /**
   * Main entrypoint.
   *
   * In this place the data file is loaded already.
   *
   * @param data
   */
  function init(data) {
    let imageWrapper = document.getElementById('image-wrapper');
    let sessionId = randomString() + randomString();
    imageWrapper.getElementsByTagName('img')[0].addEventListener('click', updateImage);

    function updateImage(change) {
      change = change == null ? true : change;
      let imgEls = imageWrapper.getElementsByTagName('img');
      let length = imgEls.length;
      if (length > 0) {
        length--;
      }

      for (let i=length; i < 5; i++) {
        let imgEl = document.createElement('img');
        imgEl.setAttribute('src', DATA_URL + '?action=randomImage&session_id=' + sessionId + '&anticache=' + randomString());
        imgEl.style.display = 'none';

        imgEl.addEventListener('click', updateImage);
        imageWrapper.appendChild(imgEl);
      }

      if (change) {
        imgEls[0].remove();
        imageWrapper.getElementsByTagName('img')[0].style.display = null;
      }
    }

    updateImage(false);
  }

  window.addEventListener("load", function(event) {
    init();
  });

  window.random = function(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
  }
})();