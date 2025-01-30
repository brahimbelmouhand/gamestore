import jwt from 'jsonwebtoken';
import { Role } from '../types';

const generateJWTtoken = ({ username, role }: { username: string, role: Role }): string => {
    const options = { expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: 'brahimbelmouhand' }
    try {
        return jwt.sign({ username, role }, process.env.JWT_SECRET!, options);
    }
    catch (error) {
        throw new Error('Error generating JWT token, see server log for details.');
    }
}

export { generateJWTtoken }