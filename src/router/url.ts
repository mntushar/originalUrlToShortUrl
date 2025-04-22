import { Router, Request, Response } from 'express';
import UrlService from '../../service/url';

const urlRouter = Router();

// generate a short url
urlRouter.post('/shorten', (req: Request, res: Response) => {
    try {
        const { url } = req.body;
        const shortCode = UrlService.getShortenUrl(url);
        res.json({ shortUrl: `http://localhost:3000/${shortCode}` });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

// redirect short url to original url
urlRouter.get('/:shortCode', (req: Request, res: Response) => {
    try {
        const originalUrl = UrlService.getOriginalUrl(req.params.shortCode);
        if (originalUrl) {
            res.redirect(originalUrl);
        } else {
            res.status(404).json({ error: 'Short URL not found' });
        }
    } catch (error: any) {
        res.status(404).json({ error: error.message });
    }
});

export default urlRouter;
