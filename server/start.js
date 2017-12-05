import db from './db';

db.query('CREATE TABLE IF NOT EXISTS `user` (' +
  '  `id` int(11) NOT NULL AUTO_INCREMENT,' +
  '  `email` varchar(256) DEFAULT NULL,' +
  '  `password` varchar(256) DEFAULT NULL,' +
  '  `salt` varchar(256) DEFAULT NULL,' +
  '  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,' +
  '  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,' +
  '  `role` varchar(45) DEFAULT \'customer\',' +
  '  `name` varchar(256) DEFAULT NULL,' +
  '  `phone` varchar(45) DEFAULT NULL,' +
  '  PRIMARY KEY (`id`),' +
  '  UNIQUE KEY `email_UNIQUE` (`email`)' +
  ') ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8;' ,function (error, results, fields) {
  if (error) {
    throw(error);
  }
});


db.query('CREATE TABLE IF NOT EXISTS `supplierList` (' +
  '`id` int(11) NOT NULL AUTO_INCREMENT,' +
    '`idCustomer` int(11) DEFAULT NULL,' +
    '`idSupplier` int(11) DEFAULT NULL,' +
    '`createdAt` datetime DEFAULT CURRENT_TIMESTAMP,' +
    'PRIMARY KEY (`id`)' +
  ') ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;' ,function (error, results, fields) {
  if (error) {
    throw(error);
  }
});

db.query('CREATE TABLE IF NOT EXISTS `inviteList` (' +
    '`id` int(11) NOT NULL AUTO_INCREMENT,' +
    '`idCustomer` int(11) DEFAULT NULL,' +
    '`status` varchar(45) DEFAULT \'new\',' +
    '`createAt` datetime DEFAULT CURRENT_TIMESTAMP,' +
    '`supplierName` varchar(256) DEFAULT NULL,' +
    '`supplierEmail` varchar(256) DEFAULT NULL,' +
    'PRIMARY KEY (`id`)' +
  ') ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;' ,function (error, results, fields) {
  if (error) {
    throw(error);
  }
});


