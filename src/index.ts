import express from 'express';
import routes from './routes/index';
import Constants from './utils/constants';

const app = express();

app.use(Constants.API, routes);

app.listen(Constants.PORT, () => {
  console.log(`Example app listening at http://localhost:${Constants.PORT}`);
});


export default app;