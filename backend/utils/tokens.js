import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

if (!JWT_ACCESS_SECRET || !JWT_REFRESH_SECRET) {
    console.error("Missing JWT_SECRET in environment variables.");
    process.exit(1);
}



export const verifyAccessToken = (token) => {
    try {
        return jwt.verify(token, JWT_ACCESS_SECRET);
    } catch (error) {
        return null;
    }
}
export const verifyRefreshToken = (token) => {
    try {
        return jwt.verify(token, JWT_REFRESH_SECRET);
    } catch (error) {
        return null;
    }
}


const generateTokens = (res, userId) => {
    const accessToken = jwt.sign({ userId }, JWT_ACCESS_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId }, JWT_REFRESH_SECRET, { expiresIn: '7d' });

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 15 * 60 * 1000 // 15 minutes
    });

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return { accessToken, refreshToken };
};

export const generateAccessTokens = (res, userId) => {
    const accessToken = jwt.sign({ userId }, JWT_ACCESS_SECRET, { expiresIn: '15m' });

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 15 * 60 * 1000 // 15 minutes
    });

    return { accessToken };
}

export default generateTokens;