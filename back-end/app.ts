import express, { NextFunction, Request, Response } from 'express';
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
import gameRouter from './controller/game.routes';
import purchaseRouter from './controller/purchase.routes';
import helmet from 'helmet';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 5001
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(bodyParser.json());

app.use(
    expressjwt({
        secret: process.env.JWT_SECRET || 'default_secret',
        algorithms: ['HS256'],
    }).unless({
        path: ['/api-docs', /^\/api-docs\/.*/, '/status', '/user/login', '/user/register', '/game/all', /^\/client\/.*/],
    })
);

app.use('/user', userRouter);
app.use('/client', clientRouter);
app.use('/admin', adminRouter);
app.use('/game', gameRouter);
app.use('/purchase', purchaseRouter);

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

app.listen(port || 5001, () => {
    console.log(`GameWebsite API is running on port ${port}.`);
});
