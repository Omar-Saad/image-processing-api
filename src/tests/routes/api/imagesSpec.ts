// import images api
import ImagesApi from '../../../routes/api/images.js';
import supertest from 'supertest';

// test all functions in api/images.ts

describe('Test Images API', () => {
  
it('should validate filename', () => {
  const filename:string = 'test.png';
  expect(ImagesApi.validateFileName(filename)).toBe(true);
});

it('should validate width and height', () => {
  const width:number = 100;
  const height:number = -100;
  expect(ImagesApi.validateWidthAndHeight(width,height)).toBe(false);
}); 
});
