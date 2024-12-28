import jwt from 'jsonwebtoken';

const generateJWTtoken = ({ username, admin }: { username: string, admin: boolean }): string => {
    const options = { expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: 'brahimbelmouhand' }
    try {
        return jwt.sign({ username, admin }, process.env.JWT_SECRET!, options);
    }
    catch (error) {
        throw new Error('Error generating JWT token, see server log for details.');
    }
}

export { generateJWTtoken }