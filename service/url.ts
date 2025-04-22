import { customAlphabet } from 'nanoid';
import dataStore from '../repository/data';

export class UrlService {
    // This is a custom alphabet for generating short codes
    private static nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 6);

    private static isValidUrl(url: string): boolean {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    // This method generates a short URL code and stores the original URL in the data store
    static getShortenUrl(originalUrl: string): string {
        if (!this.isValidUrl(originalUrl)) {
            throw new Error('Invalid URL');
        }

        let shortCode;
        do {
            shortCode = this.nanoid();
        } while (dataStore.has(shortCode));

        dataStore.set(shortCode, originalUrl);
        return shortCode;
    }

    // This method retrieves the original URL from the data store using the short code
    static getOriginalUrl(shortCode: string): string | undefined {
        return dataStore.get(shortCode);
    }
}

export default UrlService;
