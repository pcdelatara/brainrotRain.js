const br = (() => {
  let raining = false;
  let memeElements = [];
  let interval = 50; // Default spawn interval in milliseconds

  function spawnMeme(url) {
    const img = document.createElement('img');
    img.src = url;
    img.style.position = 'fixed';
    img.style.zIndex = 9999;
    img.style.width = Math.floor(Math.random() * 100 + 100) + 'px';
    img.style.transform = `rotate(${Math.random() * 360}deg)`;
    img.style.top = Math.random() * window.innerHeight + 'px';
    img.style.left = Math.random() * window.innerWidth + 'px';
    img.style.transition = 'opacity 0.5s ease-out';
    document.body.appendChild(img);
    memeElements.push(img);
  }

  async function getRandomImage() {
    try {
      const res = await fetch('https://pcdelatara.github.io/sigma-api/imgdata.json');
      const data = await res.json();
      const randomIndex = Math.floor(Math.random() * data.images.length);
      return data.images[randomIndex];
    } catch (err) {
      console.error("Failed to load image:", err);
      return null;
    }
  }

  async function start() {
    if (raining) return;
    raining = true;
    while (raining) {
      const image = await getRandomImage();
      if (image) spawnMeme(image);
      await new Promise(r => setTimeout(r, interval));
    }
  }

  function stop() {
    raining = false;
  }

  function clear() {
    memeElements.forEach(el => el.remove());
    memeElements = [];
  }

  function rainFor(seconds) {
    start();
    setTimeout(() => {
      stop();
      clear();
    }, seconds * 1000);
  }

  function setIntervalMs(ms) {
    interval = ms;
  }

  return {
    start,
    stop,
    clear,
    rainFor,
    interval: setIntervalMs
  };
})();
