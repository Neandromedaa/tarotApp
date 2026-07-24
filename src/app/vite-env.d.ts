/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_AUTH0_DOMAIN: string;
    readonly VITE_AUTH0_CLIENTID: string;
    readonly VITE_CLOUDINARY_API: string;
    readonly VITE_CEREBRAS_API: string;
    readonly VITE_FIREBASE_APIKEY: string;
    readonly VITE_FIREBASE_AUTHDOMAIN: string;
    readonly VITE_FIREBASE_PROJECTID: string;
    readonly VITE_FIREBASE_STORAGEBUCKET: string;
    readonly VITE_FIREBASE_MESSAGINGSENDERID: string;
    readonly VITE_FIREBASE_APPID: string;
    readonly VITE_FIREBASE_MEASUREMENTID: string;
    readonly VITE_DEBUG_MODE: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
