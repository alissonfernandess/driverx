const mongoose = require('mongoose');

const URI = 'mongodb://DESKTOP-EE0A75J:27017,DESKTOP-EE0A75J:27018,DESKTOP-EE0A75J:27019/driverx?replicaSet=rs';

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose
.connect(URI)
.then(() => console.log('DB is UP'))
.catch((err) => console.log(err));