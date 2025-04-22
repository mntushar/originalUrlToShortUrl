Short URL Generator Service
===========================

Description:
------------
This service generates short, unique URLs for longer original URLs. When a user accesses the short URL, they are redirected to the original URL.

Key Features:
-------------
1. Accepts a long URL as input and generates a 6-character short code
2. Redirects users to the original URL when the short URL is accessed
3. Validates input URLs
4. Ensures short code uniqueness
5. Provides REST API endpoints for URL shortening and redirection

Implementation Details:
-----------------------
1. Data Structure:
   - Uses a Map<string, string> for in-memory storage
   - Key: Short code (6 characters)
   - Value: Original URL
   - Advantages:
     * O(1) time complexity for lookups and insertions
     * Simple and efficient for this use case

2. Short URL Generation:
   - Uses nanoid library with custom alphabet (62 characters: 0-9, a-z, A-Z)
   - Generates 6-character codes (62^6 possible combinations)
   - Checks for uniqueness before assigning a code
   - Retries if generated code already exists (extremely unlikely with 6 chars)

3. Error Handling:
   - Validates URLs using the URL constructor
   - Returns appropriate HTTP status codes:
     * 400 for invalid URLs
     * 404 for non-existent short codes

4. API Endpoints:
   - POST /shorten: Creates a short URL
     Request body: { "url": "https://example.com/very/long/url" }
     Response: { "shortUrl": "http://localhost:3000/abc123" }
   
   - GET /:shortCode: Redirects to original URL
     Response: 302 redirect to original URL or 404 if not found

Setup and Usage:
---------------
1. Install dependencies:
   npm install express nanoid @types/express @types/node typescript

2. Run the service:
   - dev version: npm run dev
   - publish version: npm run build then npm start

3. Use the API:
   - To create short URL:
     POST http://localhost:3000/shorten
     Body: { "url": "your-long-url-here" }
   
   - To access original URL:
     GET http://localhost:3000/short-code-here

Testing:
-------
The solution includes proper error handling and validation:
- testing: npm test
- Try with invalid URLs
- Try accessing non-existent short codes
- Test with very long URLs
- Verify uniqueness of generated codes

Limitations:
-----------
1. In-memory storage (data lost on server restart)
2. No persistence or database
3. No analytics or tracking
4. Basic error handling
