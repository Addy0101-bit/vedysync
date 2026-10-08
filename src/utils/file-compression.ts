import imageCompression from 'browser-image-compression';

export const compressFileIfNeeded = async (file: File, maxSizeMB: number = 3): Promise<File> => {
  const fileType = file.type;
  const fileSizeMB = file.size / 1024 / 1024;

  if (fileSizeMB <= maxSizeMB) {
    return file;
  }

  if (fileType.startsWith('image/')) {
    try {
      const options = {
        maxSizeMB,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      
      const compressedBlob = await imageCompression(file, options);
      return new File([compressedBlob], file.name, {
        type: compressedBlob.type,
        lastModified: Date.now(),
      });
    } catch (error) {
      console.error("Error compressing image:", error);
      throw new Error("Failed to compress image. Please try a smaller file.");
    }
  } else if (fileType === 'application/pdf') {
    // Client-side PDF compression is complex and often requires heavy WASM libraries or server-side processing.
    // We throw an error to alert the user to compress manually.
    throw new Error(`PDF file exceeds ${maxSizeMB}MB. Please compress your PDF manually before uploading.`);
  }

  return file;
};
