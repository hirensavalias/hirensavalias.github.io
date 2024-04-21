import { typeWriter } from "./typeWriter";

export function createPromptItem(prompt, listener) {
    const promptDiv = document.createElement('div');
    promptDiv.classList.add('prompt-item');
    promptDiv.onclick = () => listener(prompt.id);

    promptDiv.innerHTML = `<i class="fa-solid fa-circle-plus fa-xl"></i>`;

    const promptQuestion = document.createElement('div');
    promptQuestion.textContent = prompt.question;
    promptDiv.appendChild(promptQuestion)

    return promptDiv;
}

export function postQuestion(question) {
    const chat = document.getElementById("chat");

    const post = document.createElement("div");
    post.classList.add('post-container');

    post.innerHTML = `<img class='profile-icon' src='./profile-icon.jpg'></div><div class='message-container'><div class='profile-name'>You</div><div class='message'>${question}</div></div > `

    chat.append(post);
}

export async function postAnswer(answer) {
    const chat = document.getElementById("chat");

    const post = document.createElement("div");
    post.classList.add('post-container');

    const messageId = Math.floor(Math.random() * 1000000);

    post.innerHTML = `<img class='profile-icon' src='./gpt.jpg'></div><div class='message-container'><div class='profile-name'>GPT</div><div class='message' id=${messageId}></div></div>`

    chat.append(post);

    const message = document.getElementById(messageId);

    const icon = post.childNodes[0];
    icon.classList.add('gpt-loading');

    await typeWriter(message, answer, 30);

    icon.classList.remove('gpt-loading');

}