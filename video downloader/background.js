let videoUrls = [];

// Monitor network requests for video content
chrome.webRequest.onCompleted.addListener((details) => {
    if (details.url.includes('youtube.com') && (details.url.endsWith('.mp4') || details.url.includes('.m3u8'))) {
        // Store the video URL when a video segment request completes
        videoUrls.push(details.url);
    }
}, { urls: ["<all_urls>"] });

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getVideos") {
        sendResponse(videoUrls);  // Send the list of video URLs
    } else if (request.action === "download") {
        const videoUrl = request.url;

        if (videoUrl.endsWith('.m3u8')) {
            // Convert .m3u8 to .mp4 using ffmpeg.js
            convertM3u8ToMp4(videoUrl, sendResponse);
        } else {
            // Direct download for .mp4 or other formats
            chrome.downloads.download({
                url: videoUrl,
                filename: `video_${Date.now()}.mp4`
            });
        }
        return true; // Indicates async response
    }
});

function convertM3u8ToMp4(m3u8Url, sendResponse) {
    // Fetch the .m3u8 file
    fetch(m3u8Url)
        .then((response) => response.text())
        .then((m3u8Data) => {
            const segments = parseM3u8(m3u8Data); // Extract video segments

            // Initialize FFmpeg.js
            const ffmpeg = FFmpeg.createFFmpeg({ log: true });
            ffmpeg.load().then(() => {
                segments.forEach((segment, index) => {
                    ffmpeg.FS('writeFile', `segment${index}.ts`, segment); // Write segment data to FS
                });

                // Merge .ts segments into a .mp4 file
                ffmpeg.run('-i', 'concat:' + segments.map((_, i) => `segment${i}.ts`).join('|'), '-c', 'copy', 'output.mp4')
                    .then(() => {
                        // Retrieve the converted .mp4 file
                        const data = ffmpeg.FS('readFile', 'output.mp4');

                        // Create a Blob from the data and download it
                        const videoBlob = new Blob([data.buffer], { type: 'video/mp4' });
                        const videoUrl = URL.createObjectURL(videoBlob);

                        // Trigger download
                        chrome.downloads.download({
                            url: videoUrl,
                            filename: `video_${Date.now()}.mp4`
                        });

                        sendResponse({ success: true });
                    })
                    .catch((err) => {
                        console.error('Error during conversion:', err);
                        sendResponse({ success: false, error: err });
                    });
            });
        });
}

function parseM3u8(m3u8Data) {
    // Simple M3U8 parsing: extract video segment URLs
    const lines = m3u8Data.split('\n');
    return lines.filter(line => line.endsWith('.ts')).map(segment => fetch(segment).then(res => res.arrayBuffer()));
}
