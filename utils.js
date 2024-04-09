export async function sleep(time = 1000) {
    return await new Promise((res) => {
        setTimeout(() => res(), time)
    });
}