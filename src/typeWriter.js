export async function typeWriter(container, message, speed = 75) {
    if (!container) return null;
    container.textContent = "";

    for (const i of message) {
        await new Promise((res, rej) => {
            setTimeout(() => {
                container.textContent += i;
                res();
            }, speed)
        });
    }

    return { done: true }
}