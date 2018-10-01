const app = require('../');
const syncDb = require('./sync-db');

syncDb().then(() => {
    console.log('sync database');
    app.listen(3000, () => {
        console.log('server is running');
    });
});
