// import dbConnect from "@/app/lib/dbConnect";
// import userModel from "@/app/model/userModel";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { NextResponse } from "next/server";

// const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey"; // store in .env

// export function generateToken(payload: object) {
//   return jwt.sign(payload, JWT_SECRET);
// }


// export function verifyToken(token: string) {
//   try {
//     return jwt.verify(token, JWT_SECRET);
//   } catch (error) {
//     return null;
//   }
// }


// export async function POST(request: Request) {
//   await dbConnect();

//   try {
//     const { email, password } = await request.json();

//     const user = await userModel.findOne({ email });

//     if (!user) {
//       return Response.json(
//         { success: false, message: " user not found " },
//         {
//           status: 200,
//         }
//       );
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return Response.json(
//         { success: false, message: "Wrong Password" },
//         {
//           status: 403,
//         }
//       );
//     }

//     const genrateAccessAndRefreshToken = async (userId: string) => {
//       const user = await userModel.findById(userId);

//       if (!user) {
//         return Response.json(
//           { success: false, message: " user ID not found " },
//           {
//             status: 200,
//           }
//         );
//       }
//       const refreshToken = user.generateRefreshToken();
//       const accessToken = user.generateAccessToken();
//       user.refreshToken = refreshToken;

//       await user.save({ validateBeforeSave: false });

//       return { accessToken, refreshToken };
//     };

//     // const { accessToken, refreshToken } = await genrateAccessAndRefreshToken(
//     //   user._id.toString()
//     // );

//     const token = generateToken({id: user._id, role: user.isAdmin})

//     const response = NextResponse.json(
//       {
//         success: true,
//         message: "Login Successfully",
//         token
//       },
//       {
//         status: 200,
//       }
//     );

//       response.cookies.set("token", token, {
//     httpOnly: true,
//     path: "/", 
//   });

//     return response;
//   } catch (error) {
//     console.log("failed to get the user");
//     return Response.json(
//       {
//         success: false,
//         message:
//           error instanceof Error ? error.message : "error in the login api",
//       },
//       {
//         status: 400,
//       }
//     );
//   }
// }



import dbConnect from "@/app/lib/dbConnect";
import userModel from "@/app/model/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey"; // store in .env

export function generateToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
}

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { email, password } = await request.json();

    const user = await userModel.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Wrong Password" },
        { status: 403 }
      );
    }

    const token = generateToken({ id: user._id, role: user.isAdmin });

    // Create response using NextResponse
    const response = NextResponse.json(
      { success: true, message: "Login Successfully", token },
      { status: 200 }
    );

    // Set HttpOnly cookie
    response.cookies.set("token", token, {
      path: "/",      // cookie available in all routes
      maxAge: 60 * 60 * 24, // 1 day in seconds
      secure: process.env.NODE_ENV === "production", // use secure cookie in production
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Login API error",
      },
      { status: 500 }
    );
  }
}
