const path = process.env.NODE_ENV ? '.env.test' : '.env';

require('dotenv').config({ path });
