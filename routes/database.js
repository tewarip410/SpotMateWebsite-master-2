const sqlite3 = require('sqlite3').verbose();

//Open a SQLite database file, or create it if it doesn't exist
var db = new sqlite3.Database('./database/spotmate.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});

db.run('DROP TABLE IF EXISTS coupons', function(err) {
  if (err) throw err;

});

db.run('CREATE TABLE IF NOT EXISTS merchants (' +
    'merchant_id INTEGER PRIMARY KEY AUTOINCREMENT,' +
    'name varchar(255) NOT NULL,' +
    'email varchar(255) NOT NULL,' +
    'password varchar(255) NOT NULL);',
    function(err) {
        if (err) throw err;
        console.log('Created table merchants');
    }
);

db.run('CREATE TABLE IF NOT EXISTS coupons (' +
    'coupon_id INTEGER PRIMARY KEY AUTOINCREMENT,' +
    'name varchar(255) NOT NULL,' +
    'description varchar(255),' +
    'redemed INTEGER NOT NULL,' +
    'remaining INTEGER NOT NULL);',
    function(err) {
      if (err) throw err;
      console.log('Created table coupons');
    }
);

/* db.run('CREATE TABLE IF NOT EXISTS logs (' +
    'log_id int PRIMARY KEY AUTOINCREMENT,' +
    'name varchar(255) NOT NULL,' +
    'email_verification varchar(255) NOT NULL,' +
    'UNIQUE (google_id));',
    function(err) {
        if (err)
            throw err;
        console.log("Created users if it didn't exist already");
    }
); */

module.exports = {
  findMerchantByLogin: function(merchant, callback) {
    const sql = 'SELECT * FROM merchants WHERE ' +
                'email = \'' + merchant.email + '\' AND ' +
                'password = \'' + merchant.password + '\';';
    db.all(sql, function(err, results) {
      if (err) throw err;
      callback(results[0]);
    })
  },

  findMerchantByID: function(id, callback) {
      let sql = 'SELECT * FROM merchants WHERE merchant_id = \'' + id + '\';';
      db.all(sql, function(err, results) {
          if (err) throw err;
          callback(results[0]);
      })
  },

  addMerchant: function(merchant) {
      let sql = 'INSERT INTO merchants (name, email, password) VALUES (?, ?, ?)';
      let data = [merchant.name, merchant.email, merchant.password];

      db.run(sql, data, function(err, results) {
          if (err) throw err;
      });
  },

  getCoupons: function(callback) {
    const sql = 'SELECT * FROM coupons;';
    db.all(sql, function(err, results) {
      if (err) throw err;
      callback(results);
    })
  },

  findCouponByID: function(id, callback) {
      let sql = 'SELECT * FROM coupons WHERE coupon_id = \'' + id + '\';';
      db.all(sql, function(err, results) {
          if (err) throw err;
          callback(results[0]);
      })
  },

  addCoupon: function(coupon) {
      let sql = 'INSERT INTO coupons (name, description, redemed, remaining) VALUES (?, ?, ?, ?)';
      let data = [coupon.name, coupon.descripton, coupon.redemed, coupon.remaining];

      db.run(sql, data, function(err, results) {
          if (err) throw err;
      });
  },

  findMerchantCoupons: function(merchant_id, callback) {
    let sql = 'SELECT * FROM coupons WHERE merchant_id = \'' + merchant_id + '\';';
    db.all(sql, function(err, results) {
        if (err) throw err;
        callback(results);
    })
  }
}
