# Image Processing API

The Image Processing API is a RESTful API that allows you to resize any image to any size you want.

## Technologies used
- Node.js
- Express
- Typescript
- Jasmine
- Sharp (For image processing)

## How to use
1 - Clone the repository_ _
2 - Run `npm install`_ _
3 - Put the image you want to resize in the folder `src\assets\original_images`_ _
4 - Run the command `npm run build`_ _
5 - Run the command `node dist\index.js`_ _
6 - Currently, The api is working locally, so you can access it by typing `http://localhost:3000/resize?filename=your_image_name&width=desired_width&height=desired_height` in your browser._ _
 - The resized image will be saved in the folder `src\assets\resized_images`

## How to run jasmine tests
1 - Run the command `npm run test`



