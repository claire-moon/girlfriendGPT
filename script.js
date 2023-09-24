const chatContainer = document.getElementById('chat-container');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');

let chatData = [
    { type: 'user', text: 'test1' },
    { type: 'gpt', text: 'test2' },
    { type: 'user', text: 'test3' },
    { type: 'gpt', text: 'test4' },
    { type: 'user', text: 'test5' },
    { type: 'gpt', text: 'test6' },
    { type: 'user', text: 'test7' },
    { type: 'gpt', text: 'test8' },
    { type: 'user', text: 'test9' },
    { type: 'gpt', text: 'test10' },
    { type: 'user', text: 'test11' },
    { type: 'gpt', text: 'test12' },
    { type: 'user', text: 'test13' },
    { type: 'gpt', text: 'test14' },
    { type: 'user', text: 'test15' },
    { type: 'gpt', text: 'test16' },
    { type: 'user', text: 'test17' },
    { type: 'gpt', text: 'test18' },
    { type: 'user', text: 'test19' },
    { type: 'gpt', text: 'test20' }
];

let chatIndex = 0;

function typeMessage(message, callback) {
    let index = 0;
    function typeChar() {
        if (index < message.length) {
            chatInput.value += message[index];
            index++;
            setTimeout(typeChar, 50);
        } else {
            callback();
        }
    }
    typeChar();
}

function sendMessage(type, text) {
    const template = document.getElementById('message-template');
    const messageDiv = template.content.cloneNode(true);

    const messageImage = messageDiv.querySelector('.profile-pic');
    const messageText = messageDiv.querySelector('.message-text');

    if (type === 'user') {
        messageImage.src = 'path_to_user_image.jpg'; // Replace with actual path to user image
        messageDiv.querySelector('.chat-message').classList.add('user');
    } else if (type === 'gpt') {
        messageImage.src = 'path_to_gpt_image.jpg'; // Replace with actual path to GPT image
        messageDiv.querySelector('.chat-message').classList.add('gpt');
    }

    messageText.textContent = text;
    chatContainer.insertBefore(messageDiv, chatInput.parentElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function simulateButtonClick(callback) {
    sendBtn.style.backgroundColor = '#1a4ad9'; // Darken the button
    setTimeout(() => {
        sendBtn.style.backgroundColor = '#2962ff'; // Reset to original color
        callback();
    }, 300);
}

function animateEllipsis(callback) {
    let count = 1;
    let ellipsisMessageDiv = document.createElement('div');
    ellipsisMessageDiv.classList.add('chat-message', 'gpt');
    chatContainer.insertBefore(ellipsisMessageDiv, chatInput.parentElement);
    function addDot() {
        if (count <= 3) {
            ellipsisMessageDiv.textContent = '.'.repeat(count);
            count++;
            setTimeout(addDot, 500);
        } else {
            callback(ellipsisMessageDiv);
        }
    }
    addDot();
}

function playChat() {
    if (chatIndex < chatData.length) {
        const message = chatData[chatIndex];
        if (message.type === 'user') {
            typeMessage(message.text, () => {
                setTimeout(() => {
                    simulateButtonClick(() => {
                        sendMessage('user', chatInput.value);
                        chatInput.value = '';
                        chatIndex++;
                        setTimeout(playChat, 1000); // Reduce the delay to make it quicker
                    });
                }, 1000); // Reduce the delay for testing
            });
        } else if (message.type === 'gpt') {
            animateEllipsis((ellipsisMessageDiv) => {
                ellipsisMessageDiv.remove();
                sendMessage('gpt', message.text);
                chatIndex++;
                setTimeout(playChat, 1000); // Reduce the delay for testing
            });
        }
    }
}

playChat();
