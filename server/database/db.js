import mongoose from "mongoose";

const Connection = () => {
    const DB_URI = `mongodb://user:Gmail05Clone@ac-3fzm630-shard-00-00.seeggfa.mongodb.net:27017,ac-3fzm630-shard-00-01.seeggfa.mongodb.net:27017,ac-3fzm630-shard-00-02.seeggfa.mongodb.net:27017/?ssl=true&replicaSet=atlas-bkhihw-shard-0&authSource=admin&retryWrites=true&w=majority`;
    try {
        mongoose.connect(DB_URI);
        console.log("Database connected successfully");
    } catch (error) {
        console.log('Error while connecting with the database ', error.message);
    }
}

export default Connection;