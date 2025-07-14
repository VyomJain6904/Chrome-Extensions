// Fetch videos from the background script
chrome.runtime.sendMessage({ action: "getVideos" }, (videos) => {
    const videoList = document.getElementById("video-list");
    videoList.innerHTML = "";

    if (videos.length === 0) {
        videoList.innerHTML = "<p>No videos detected.</p>";
        return;
    }

    videos.forEach((videoUrl, index) => {
        const videoItem = document.createElement("div");
        videoItem.className = "video-item";

        const videoName = `Video ${index + 1}`;
        const downloadButton = document.createElement("button");
        downloadButton.textContent = "Download";

        downloadButton.addEventListener("click", () => {
            chrome.runtime.sendMessage({ action: "download", url: videoUrl }, (response) => {
                if (response.success) {
                    alert('Download started!');
                } else {
                    alert(`Error: ${response.error}`);
                }
            });
        });

        videoItem.textContent = `${videoName}: `;
        videoItem.appendChild(downloadButton);
        videoList.appendChild(videoItem);
    });
});
