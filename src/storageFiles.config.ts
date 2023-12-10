import { diskStorage } from "multer";
import { extname } from "path";

export const storage = diskStorage({
    destination: "src/uploads/files",
    filename: (req, files, callback) => {
      callback(null, generateFilename(files));
    }
  });
  
  function generateFilename(file) {
    return `${Date.now()}${extname(file.originalname)}`;
  }

  