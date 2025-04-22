import UrlService from '../service/url';

describe('URL Shortener Tests', () => {
  test('should shorten and retrieve a valid URL', () => {
    const originalUrl: string = 'https://www.google.com/';
    const code: string = UrlService.getShortenUrl(originalUrl);
    const retrieved: string | undefined = UrlService.getOriginalUrl(code);
    expect(retrieved).toBe(originalUrl);
  });

  test('should throw error for invalid URL', () => {
    expect(() => UrlService.getShortenUrl('invalid-url')).toThrow('Invalid URL');
  });
});
