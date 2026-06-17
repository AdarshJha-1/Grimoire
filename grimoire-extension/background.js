const IS_PRODUCTION = false;

const API_BASE_URL = IS_PRODUCTION
    ? "https://vercel.app"
    : "http://localhost:3000";

chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error("Sidebar activation error:", error));

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "CLIP_NOTE") {

        fetch(`${API_BASE_URL}/api/mark`, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(message.data)
        }).then(async (res) => {
            if (!res.ok) {
                if (res.status === 401) {
                    throw new Error("Grimoire Vault Sealed. Please log in to the website first.");
                }
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.message || `Server Error ${res.status}`);
            }
            return res.json();
        }).then((data) => {
            sendResponse({ success: true, data });
        }).catch((error) => {
            console.error("Upload failure details:", error);
            sendResponse({ success: false, error: error.message });
        });

        return true;
    }
});
