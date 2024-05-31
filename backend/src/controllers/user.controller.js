import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation
  // check if user already exists : email
  // check for image (profilePic)
  // upload to cloudinary if exists
  // create user object - create entry in db
  // remove password and refrest token field from response
  // check for user creation
  // return response

  const { username, email, fullname, password } = req.body;

  // if(fullname===""){
  //   throw new ApiError(400, "Full name is required")
  // }

  // check if we got all fields
  if (
    [fullname, email, username, password].some((field) => {
      return field?.trim() === "";
    })
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // // email validation
  // ((email) => {
  //   const parts = email.split("@");

  //   if (parts.length !== 2) {
  //     throw new ApiError(400, "Email invalid");
  //   }

  //   const [username, domain] = parts;

  //   if (username.length === 0 || domain.length === 0) {
  //     throw new ApiError(400, "Email invalid");
  //   }

  //   if (!/^[a-zA-Z0-9._]/.test(username)) {
  //     throw new ApiError(400, "Email invalid");
  //   }

  //   const domainParts = domain.split(".");
  //   if (domainParts.length < 2) {
  //     throw new ApiError(400, "Email invalid");
  //   }

  //   return true;
  // })();

  // Check if user already exists

  // const existedUser = User.findOne({
  //   $or: [{ username }, { email }],
  // });
  const existedUserSameEmail = await User.findOne({ email });
  const existedUserSameUsername = await User.findOne({ username });

  if (existedUserSameEmail && existedUserSameUsername) {
    throw new ApiError(409, "User with same email and username already exists");
  } else if (existedUserSameEmail) {
    throw new ApiError(409, "User with same email already exists");
  } else if (existedUserSameUsername) {
    throw new ApiError(409, "User with same username already exists");
  }

  // upload profile pic
  // const profilePicLocalPath = req.files?.profilePic[0]?.path;
  if (!req.file) {
    // Handle the case where no file is uploaded
    return res.status(400).json(new ApiResponse(400, null, "No profile picture uploaded"));
  }

  const profilePicLocalPath = req.file.path;

  const profilePic = await uploadOnCloudinary(profilePicLocalPath);

  // create entry of user on DB
  const user = await User.create({
    username: username.toLowerCase(),
    profilePic: profilePic.url || "",
    email,
    fullname,
    password,
  });

  const createdUser = await User.findById(user._id).select(
    // write what you don't want
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the wrong");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

export { registerUser };
