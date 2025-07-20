export const typeWriterEffect = async (text: string, callback: (chunk: string) => void, delay = 20) => {
    for (let i = 0; i < text.length; i++) {
        await new Promise(resolve => setTimeout(resolve, delay));
        callback(text.slice(0, i + 1));
    }
};