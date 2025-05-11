import { Request, Response, NextFunction } from "express";
import dns from 'dns/promises';
import ipaddr from 'ipaddr.js';

const ALLOWED_HOSTS = [''];

function isHostAllowed(urlStr: string): boolean {
    try {
        const { hostname } = new URL(urlStr);
        return ALLOWED_HOSTS.includes(hostname);
    } catch {
        return false;
    }
}

async function isExternalAddress(urlStr: string): Promise<boolean> {
    try {
        const url = new URL(urlStr);
        const addrs = await dns.lookup(url.hostname, { all: true });
        return addrs.every(({ address }) => {
            const ip = ipaddr.parse(address);
            const range = ip.range();
            return !['loopback', 'private', 'linkLocal', 'uniqueLocal'].includes(range);
        });
    } catch {
        return false;
    }
}

export function ssrfProtection(urlField: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const userUrl = req.body[urlField] || req.query[urlField];
        if (!userUrl || typeof userUrl !== 'string') {
            return res.status(400).json({ error: 'Missing or invalid URL' });
        }

        if (!isHostAllowed(userUrl) || !(await isExternalAddress(userUrl))) {
            return res.status(400).json({ error: 'URL not allowed' });
        }

        next();
    };
}