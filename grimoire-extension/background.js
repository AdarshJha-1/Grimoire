chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error("Sidebar activation error:", error));

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "CLIP_NOTE") {

        fetch("http://localhost:3000/api/mark", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(message.data)
        })
            .then(async (res) => {
                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.message || `Server responded with status code ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                sendResponse({ success: true, data });
            })
            .catch((error) => {
                console.error("Network upload execution error details:", error);
                sendResponse({ success: false, error: error.message });
            });

        return true;
    }
});
