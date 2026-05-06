import { asyncHandler } from "../utils/asyncHandle.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadFile } from "../utils/FileUpload.js";

const registerUser = asyncHandler(async (req, res)=>{
    // get details from frontend--postman
    // validation - credential correctness-- not empty
    // check if user already exists: username, email
    // check for images, avatar
    // upload them to cloudinary
    // create user object-- create entry in db
    // remove pass and token from res
    // check for user creation
    // return res
    const {fullName, email, userName, password} = req.body
    console.log("email: ", email);
    if(
        [fullName, email, userName, password].some((field)=>
            field?.trim() ==="")
    ){
        throw new ApiError(400, "All fields are compulsory")
    }

    // if(fullName === ""){
    //     throw new ApiError(400, "fullName required")
    // }
    const existedUser = User.findOne({
        $or: [{userName},{email}]
    })
    if(existedUser){
        throw new ApiError(409,"User already exist")
    }
    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path   
    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file required")
    }    
    const avatar = await uploadFile(coverImageLocalPath)
    const coverImage = await uploadFile(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400, "Avatar File required")
    }
    User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage.url || "",
        email,
        password,
        username : username.toLowerCase()
    })
})

export {registerUser}