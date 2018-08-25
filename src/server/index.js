const port = process.env.PORT || 3000;
const express = require('express');
const path = require('path');
const Axios = require('axios');
const AWS = require('aws-sdk');
const accessKeyId = require('./config.js').keys.accessKeyId;
const secretAccessKeyId = require('./config.js').keys.secretAccessKeyId;
const barcodableKey = require('./config.js').keys.barcodable;
const multer = require('multer');
const multerS3 = require('multer-s3');
const CLOSET_AI_BUCKET = 'closet.test'
const S3_API_VER = '2006-03-01';
const db = require('../database');
const bcrypt = require('bcrypt-nodejs');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const homePath = __dirname + '../../../dist';
app.use(express.static(homePath));
app.use('/signup', express.static(homePath));
app.use((res, req, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});

const s3 = new AWS.S3({
  accessKeyId: accessKeyId,
  secretAccessKeyId: secretAccessKeyId,
  Bucket: CLOSET_AI_BUCKET,
  apiVersion: S3_API_VER
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: CLOSET_AI_BUCKET,
    acl: 'private',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: (req, file, cb) => {
      cb(null, {fieldName: file.fieldname});
    },
    key: (req, file, cb) => {
      cb(null, 'test');
    }
  })
});

app.post('/api/drop', upload.single('image'), (req, res, next) => {
  let params = {
    ACL: 'private',
    Bucket: CLOSET_AI_BUCKET,
    Key: 'test',
  };
  s3.putObject(params, (err) => {
    if (err) {
      res.status(400);
      res.write('Error creating object');
      res.end();
    } else {
      next();
    }
  });
});

app.post('/api/saveOutfit', (req, res) => {
  db.addOutfit(req.body.items, req.body.outfitProperties, 1);
  res.sendStatus(200);
});

app.get('/recommendoutfit', (req, res) => {
  let season = req.query.season;
  db.makeOutfitBySeason(season, (outfit) => {
    res.status(200).send(JSON.stringify(outfit));
  });
});

app.get('/randomoutfit', (req, res) => {

});

app.post('/uploaditem', (req, res) => {
  db.addItem(req.body.item, 1);
})

app.get('/getstyles', (req, res) => {
  db.getStyles((styles) => {
    res.status(200).send(styles);
  })
});

app.get('/getcolors', (req, res) => {
  db.getColors((colors) => {
    res.status(200).send(colors);
  })
})

app.get('/api/barcode', (req, res) => {
  let config = {
    headers: {
      Authorization: barcodableKey
    }
  };
  Axios.get(`https://www.barcodable.com/api/v1/upc/${req.query.data}`, config)
  .then((response) => {
    res.send(response.data);
  }).catch((error) => {
    res.status(500).send({error: 'There was an error getting your info from Barcodable'});
  });
});

app.post('/signup', (req, res) => {
  let userData = req.body;
  bcrypt.hash(userData.password, null, null, (err, hash) => {
    if (err) {
      res.redirect(500, '/signup');
    }
    userData.password = hash;
  });
  db.checkUserExists(userData.email, (err, result) => {
    if (err) {
      res.redirect(500, '/signup');
    }
    if (result.length) {
      res.status(500).send('username already exists!');
    } else {
      db.createUser(userData, (err, result) => {
        if (err) {
          res.redirect(500, '/signup');
        } else {
          req.session.regenerate(() => {
            req.session.user = result.insertId;
            res.redirect('/home');
          });
        }
      });
    }
  });
});

app.get('/getitems', (req, res) => {
  let data = {
    userId: req.query.userId, // need to update based on how the user is stored
  };
  db.getItems(data, (result, error) => {
    if (error) {
      res.status(500).end(error);
    } else {
      res.status(200).send(JSON.stringify(result));
    }});
});


app.get('/getoutfits', (req, res) => {
  let data = {
    userId: req.query.userId, // need to update based on how the user is stored
  };
  db.getOutfits(data, (result, error) => {
    if (error) {
      res.status(500).end(error);
    } else {
      res.status(200).send(JSON.stringify(result));
    }});
});

app.post('/edititem', (req, res) => {
  let data = {
    userId: req.query.userId, // need to update based on how the user is stored
  };
  db.editItem(req.body, (result, error) => {
    if (error) {
      res.status(500).end(error);
    } else {
      res.status(200).send(JSON.stringify(result));
    }});
});

app.post('/removeitem', (req, res) => {
  // need auth
  db.deleteItem(req.body, (result, error) => {
    if(error) {
      res.status(500).end(error);
    } else {
      res.status(200).send(JSON.stringify(result));
    }
  });
});

app.get('/cleartables', (req, res) => {
  db.clearTables();
  res.status(200).end('Tables clear, but still exist')
});

app.get('/dropdb', (req, res) => {
  db.dropTables();
  res.status(200).end('Tables deleted, restart server to recreate')
});

app.get('/createdb', (req, res) => {
  db.createDB();
  res.status(200).end('Tables created')
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname + '../../../dist/index.html'));
});

app.listen(port, () => {
  console.log('listening on port ' + port);
});
