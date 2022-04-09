import session from 'express-session';

interface SupplierSessionData {
    id: number;
    email: string;
}

declare module 'express-session' {
    interface SessionData {
        supplier: SupplierSessionData;
    }
}