import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import imageDownloader from "image-downloader"
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);






const uploadByLink = asyncHandler(async (req, res) => {

    const {link} = req.body;
    const newName = 'photo'+Date.now() + '.jpg';

    if (!link) {
        throw new ApiError(400, "Please provide a link to the image");
    }

    await imageDownloader.image({
        url: link,
        dest: path.join(__dirname,'..',  '/uploads/' + newName)
    })

    return res.status(201).json(new ApiResponse(201, "Image uploaded successfully",newName));

});

export {uploadByLink}