const { router } = require('./controller/router/router');
const app = require('./servidor');



app.use(router);
app.listen(3000);