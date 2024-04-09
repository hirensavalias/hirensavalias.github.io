import { createPromptItem, postAnswer, postQuestion } from './elements';
import { INTRO_MESSAGE, PROMPTS } from './messages.constants';
import './style.css'
import { typeWriter } from './typeWriter';
import { sleep } from './utils';

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
  await sleep(500);
  postAnswer(selectedPrompt.answers[0]);
}

function initPrompts() {
  const prompt = document.getElementById("prompts-container");
  const promptList = PROMPTS.sort(() => (Math.random() * 2) - 1).map(prompt => {
    return createPromptItem(prompt, handlePromptClick);
  })
  promptList.map(item => prompt.append(item));
}

showIntro();
initPrompts();


