import app from '../index';
import supertest from 'supertest';

const req = supertest(app);


describe('Test Endpoints', () => {
    it('should return 400 if no query params are provided', async () => {
        const res = await req.get('/api/images');
        expect(res.status).toBe(400);       
      });

        it('should return 400 if query params are not valid', async () => {
            const res = await req.get('/api/images?width=-200&height=100&filename=');
            expect(res.status).toBe(400);       
          });

            it('should return 200 if query params are valid', async () => {
                const res = await req.get('/api/images?width=200&height=100&filename=test.png');
                expect(res.status).toBe(200);       
              });
  }); 
