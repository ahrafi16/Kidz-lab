const uri = process.env.MONGODB_URI;
const dbname = process.env.DB_NAME;
export const collections = {
    PRODUCTS: 'products',
    USERS: 'users',
    CART: 'cart',
};

const { MongoClient, ServerApiVersion } = require('mongodb');

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let isConnected = false;

export const dbConnect = (cname) => {
    if (!isConnected) {
        client.connect(); 
        isConnected = true;
    }

    return client.db(dbname).collection(cname);
};








