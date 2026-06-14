import mongoose from 'mongoose';
const uri = 'mongodb://Shorelumeadmin:lATGDhXt8Aouk5UJ@ac-vvyizqc-shard-00-00.mcyluhb.mongodb.net:27017,ac-vvyizqc-shard-00-01.mcyluhb.mongodb.net:27017,ac-vvyizqc-shard-00-02.mcyluhb.mongodb.net:27017/shorelume?ssl=true&replicaSet=atlas-vvyizqc-shard-0&authSource=admin&retryWrites=true&w=majority';
mongoose.connect(uri).then(() => {
  console.log("Connected!");
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
