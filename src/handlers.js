export function handleExpandPromptButtonClick() {
    const prompts = document.getElementsByClassName('prompts')[0];
    prompts.classList.toggle('prompts-expanded');
}