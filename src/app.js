import { createPromptItem, postAnswer, postQuestion } from './elements';
import { INTRO_MESSAGE, PROMPTS } from './messages.constants';
import './styles/global.css'
import { typeWriter } from './typeWriter';
import { sleep } from './utils';
import { handleExpandPromptButtonClick } from './handlers';

function showIntro() {
  const introContainer = document.getElementById("intro");
  typeWriter(introContainer, INTRO_MESSAGE);
}

function hideIntro() {
  const introContainer = document.getElementById("intro");
  if (!introContainer) return;
  introContainer.remove()
}

async function handlePromptClick(id) {
  hideIntro();

  const selectedPrompt = PROMPTS.find((prompt) => id === prompt.id);
  postQuestion(selectedPrompt.question);
  await sleep(200);
  postAnswer(selectedPrompt.answers[0]);
  await sleep(300);
  const chatContainer = document.getElementById("chat-container");
  chatContainer.scrollTo(0, chatContainer.scrollHeight);
  initPrompts();
}

function initPrompts() {
  const prompt = document.getElementsByClassName("prompts")[0];
  prompt.innerHTML = ""
  const promptList = PROMPTS.sort(() => (Math.random() * 2) - 1).map(prompt => {
    return createPromptItem(prompt, handlePromptClick);
  })
  promptList.map(item => prompt.append(item));
}

showIntro();
initPrompts();

(function () {
  const expandButton = document.getElementsByClassName('expand-button')[0];
  expandButton.addEventListener('click', handleExpandPromptButtonClick)
})()


