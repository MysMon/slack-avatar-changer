// ==UserScript==
// @name         Slack Avatar Changer
// @namespace    https://github.com/MysMon/slack-avatar-changer
// @version      1.0
// @description  Change user avatars on Slack using file input, save them in local storage, and clear the changes if needed.
// @match        https://*.slack.com/*
// @grant        none
// @downloadURL  https://github.com/MysMon/slack-avatar-changer/raw/master/src/slack-avatar-changer.user.js
// @updateURL    https://github.com/MysMon/slack-avatar-changer/raw/master/src/slack-avatar-changer.user.js
// @supportURL   https://github.com/MysMon/slack-avatar-changer/issues
// ==/UserScript==

(function() {
    'use strict';

    // Load user avatars from local storage
    const userAvatars = JSON.parse(localStorage.getItem('userAvatars')) || {};

    // Define button styles
    const buttonStyle = `
        .change-avatar-button, .clear-avatar-button {
            margin-left: 10px;
            margin-top: 10px;
            padding: 5px 10px;
            background-color: #007a5a;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        .change-avatar-button:hover, .clear-avatar-button:hover {
            background-color: #148567;
        }
        .change-avatar-button:active, .clear-avatar-button:active {
            background-color: #005a40;
        }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = buttonStyle;
    document.head.appendChild(styleSheet);

    function getUserIdFromImage(img) {
        try {
            const src = img.src || img.srcset.split(' ')[0];
            const match = src.match(/https:\/\/ca\.slack-edge\.com\/[A-Z0-9]+-([A-Z0-9]+)-/);
            return match ? match[1] : img.getAttribute('data-user-id');
        } catch (error) {
            console.error('Error extracting user ID:', error);
            return null;
        }
    }

    function replaceAvatars(targetNode = document.body) {
        targetNode.querySelectorAll('img').forEach(img => {
            const userId = getUserIdFromImage(img);
            if (userId && userAvatars[userId]) {
                img.src = userAvatars[userId];
                img.setAttribute('data-user-id', userId);
                img.srcset = `${userAvatars[userId]} 2x`;
            }
        });
    }

    function addButton(profileContainer, userId) {
        if (!userId || profileContainer.querySelector('.change-avatar-button')) return;

        const changeButton = document.createElement('button');
        changeButton.innerText = 'Change Avatar';
        changeButton.classList.add('change-avatar-button');
        changeButton.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = () => {
                const file = input.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        userAvatars[userId] = reader.result;
                        localStorage.setItem('userAvatars', JSON.stringify(userAvatars));
                        replaceAvatars();
                    };
                    reader.readAsDataURL(file);
                }
            };
            input.click();
        });

        const clearButton = document.createElement('button');
        clearButton.innerText = 'Clear Avatar';
        clearButton.classList.add('clear-avatar-button');
        clearButton.addEventListener('click', () => {
            delete userAvatars[userId];
            localStorage.setItem('userAvatars', JSON.stringify(userAvatars));
            replaceAvatars();
            location.reload();
        });

        const buttonContainer = document.createElement('div');
        buttonContainer.appendChild(changeButton);
        buttonContainer.appendChild(clearButton);

        const avatarContent = profileContainer.querySelector('.p-r_member_profile__avatar_content');
        avatarContent.appendChild(buttonContainer);
    }

    function addChangeAvatarButtons(targetNode = document.body) {
        targetNode.querySelectorAll('.p-r_member_profile__container').forEach(profileContainer => {
            const profileImage = profileContainer.querySelector('.p-r_member_profile__avatar__img_container img');
            if (profileImage) {
                const userId = getUserIdFromImage(profileImage);
                addButton(profileContainer, userId);
            }
        });
    }

    function initialize() {
        try {
            replaceAvatars();
            addChangeAvatarButtons();
        } catch (error) {
            console.error('Initialization error:', error);
        }
    }

    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    replaceAvatars(node);
                    addChangeAvatarButtons(node);
                }
            });
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('load', initialize);
    document.addEventListener('DOMContentLoaded', initialize);
})();