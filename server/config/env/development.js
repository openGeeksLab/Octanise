var hostUrl = process.env.TEST_HOST_URL || 'http://localhost:8000/';

module.exports  =  {
	hostUrl: hostUrl,
  mysql: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1',
    database: 'test'
  },
  redis: {
    url: 'redis://localhost:6379',
  }
};