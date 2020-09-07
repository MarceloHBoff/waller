import Redis from 'ioredis';

import RedisConfig from '../config/redis';

class Cache {
  constructor() {
    this.redis = new Redis(RedisConfig);
  }

  set(key, value) {
    if (process.env.NODE_ENV === 'test') return null;

    return this.redis.set(key, JSON.stringify(value), 'EX', 60 * 60);
  }

  async get(key) {
    if (process.env.NODE_ENV === 'test') return null;

    const cached = await this.redis.get(key);

    return cached ? JSON.parse(cached) : null;
  }

  delete(key) {
    return this.redis.del(key);
  }
}

export default new Cache();
