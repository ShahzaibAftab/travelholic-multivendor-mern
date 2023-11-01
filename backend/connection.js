const mongoose = require('mongoose');
const DB = 'mongodb://root:travelholic@ac-ojoaykp-shard-00-00.sl2uyas.mongodb.net:27017,ac-ojoaykp-shard-00-01.sl2uyas.mongodb.net:27017,ac-ojoaykp-shard-00-02.sl2uyas.mongodb.net:27017/?replicaSet=atlas-3dawx7-shard-0&ssl=true&authSource=admin'
// const DB = 'mongodb://localhost:27017/TravelholicDB'
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Database Connected')).catch((error) => console.log(error.message));

// mongodb://localhost:27017/TravelholicDB