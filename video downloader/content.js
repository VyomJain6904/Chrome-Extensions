// Send all video sources to the background script
document.querySelectorAll('video').forEach((video) => {
    const videoSrc = video.currentSrc || video.src;
    if (videoSrc) {
        chrome.runtime.sendMessage({ action: "addVideo", url: videoSrc });
    }
});
