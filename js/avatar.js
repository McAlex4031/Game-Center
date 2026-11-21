
const avatarEmojis = [
    "👾", "🎮", "👽", "🤖",
    "🐱", "🐶", "🦊", "🐼",
    "🐸", "🐵", "🦁", "🐲",
    "🚀", "⚡", "🔥", "💎",
    "🎯", "👻", "🧙", "🥷",
    "♠️​", "👺", "​👹", "​🎮​"​
];

const avatarColors = [
    "#334C83",
    "#176B87",
    "#177D68",
    "#587A35",
    "#A15C35",
    "#A13D55",
    "#774C9E",
    "#555B6E",
    "#B08030",
    "#30343B",
    "#f50535",
    "#05f5c5",
    "#f1f505"
];

function loadProfileAvatar() {

    const avatar = document.getElementById(
        "profile-avatar"
    );

    const emojiElement = document.getElementById(
        "profile-avatar-emoji"
    );

    if (!avatar || !emojiElement) return;

    let savedAvatar = {};

    try {
        savedAvatar = JSON.parse(
            localStorage.getItem("gc-profile-avatar")
        ) || {};
    } catch {
        savedAvatar = {};
    }

    const emoji = avatarEmojis.includes(savedAvatar.emoji)
        ? savedAvatar.emoji
        : "👾";

    const color = avatarColors.includes(savedAvatar.color)
        ? savedAvatar.color
        : "#334C83";

    emojiElement.textContent = emoji;

    avatar.style.setProperty(
        "--avatar-bg",
        color
    );
}

// Chargement de l'avatar
document.addEventListener(
    "DOMContentLoaded",
    loadProfileAvatar
);
