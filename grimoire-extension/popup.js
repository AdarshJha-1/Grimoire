const IS_PRODUCTION = false;

const API_BASE_URL = IS_PRODUCTION
    ? "https://grimoire.vercel.app"
    : "http://localhost:3000";

fetch(`${API_BASE_URL}/api/auth/get-session`, { credentials: "include" })
    .then(res => res.json())
    .then(data => {
        const statusBadge = document.querySelector(".status-badge");
        const actionButton = document.getElementById("open-dashboard");

        if (data && data.user) {
            const userAvatarImg = data.user.image
                ? `<img src="${data.user.image}" alt="" class="user-avatar-mini" />`
                : `<span class="user-avatar-fallback">🔮</span>`;

            statusBadge.innerHTML = `
                ${userAvatarImg}
                <div class="user-meta-block">
                    <span class="user-status-text">Clipper: Connected</span>
                    <span class="user-name-text">${data.user.name}</span>
                </div>
            `;

            actionButton.innerText = "Open Your Grimoire";
            actionButton.style.backgroundColor = "#10b981";
        } else {
            statusBadge.innerHTML = `
                <span class="vault-sealed-indicator"></span> 
                <span>Vault Sealed: Signed Out</span>
            `;
            actionButton.innerText = "👉 Click to Login on Website";
            actionButton.style.backgroundColor = "#ef4444";
        }
    })
    .catch(err => console.error("Could not verify session:", err));

document.getElementById("open-dashboard").addEventListener("click", () => {
    chrome.tabs.create({ url: API_BASE_URL });
});
