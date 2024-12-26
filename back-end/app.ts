import express, { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import 'swagger-jsdoc';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { expressjwt } from 'express-jwt';
import userRouter from './controller/user.routes';
import clientRouter from './controller/client.routes';
import adminRouter from './controller/admin.routes';
import bodyParser from 'body-parser';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 8080

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());

app.use(
    expressjwt({
        secret: process.env.JWT_SECRET || 'default_secret',
        algorithms: ['HS256'],
    }).unless({
        path: ['/api-docs', /^\/api-docs\/.*/, '/users/login', '/users/signup', '/status'],
    })
);

app.use('/users', userRouter);
app.use('/client', clientRouter);
app.use('/admin', adminRouter);

app.get('/status', (req, res) => {
    res.json({ message: 'GameWebsite API is running...' });
});

const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'GameWebsite API',
            version: '1.0.0'
        }
    },
    apis: ['./controller/*.routes.ts']
}

const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ status: 'unauthorized', message: err.message });
    } else if (err.name === 'CoursesError') {
        res.status(400).json({ status: 'domain error', message: err.message });
    } else {
        res.status(400).json({ status: 'application error', message: err.message });
    }
});

app.listen(port || 3000, () => {
    console.log(`Courses API is running on port ${port}.`);
});
