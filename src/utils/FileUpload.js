import {v2 as cloudinary} from 'cloudinary'
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadFile = async(localpath)=>{
    try {
        if(!localpath) return null
        //upload file on cloud
        const response = await cloudinary.uploader.upload(localpath,{
            resource_type: "auto"
        })
        return response
    } catch (error) {
        fs.unlinkSync(localpath)
    }
}
cloudinary.uploader.upload()