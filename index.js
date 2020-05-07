/* eslint-disable no-console */
const config = require('./config/index');
const app = require('./app');

const { PORT } = config;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
