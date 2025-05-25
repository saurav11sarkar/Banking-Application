import multer from "multer";

export const multerConfig = (fileName: string) => {
  return multer({ storage: multer.memoryStorage() }).single(fileName);
};
