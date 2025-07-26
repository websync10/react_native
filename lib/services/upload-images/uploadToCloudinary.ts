export const uploadToCloudinary = async (localUri: string): Promise<string | null> => {
    const cloudName = 'dzgreiyqa';
    const uploadPreset = 'myuze-ai';

    const formData = new FormData();
    formData.append('file', {
        uri: localUri,
        type: 'image/jpeg',
        name: 'upload.jpg',
    } as any);

    formData.append('upload_preset', uploadPreset);

    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();

        if (data.secure_url) {
            return data.secure_url;
        } else {
            console.error('Cloudinary upload failed:', data);
            return null;
        }
    } catch (err) {
        console.error('Upload error:', err);
        return null;
    }
};
