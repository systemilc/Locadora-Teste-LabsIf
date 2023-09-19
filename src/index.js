const { router } = require('./router/router');
const app = require('./servidor');



app.use(router);
app.listen(3000);