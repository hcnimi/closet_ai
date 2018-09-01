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
const cookieParser = require('cookie-parser');
const uuidv4 = require('uuid/v4');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const homePath = path.resolve(__dirname, '../../dist');
app.use(express.static(homePath));
app.use('/signup', express.static(homePath));
app.use((res, req, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});

app.use(cookieParser());
app.use(session({
  genid: (req) => {
    return uuidv4();
  },
  secret: 'hal 2000',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 600000},
}));

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

const checkUser = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
};
app.get('/home', checkUser, (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../client/dist/index.html'));
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

app.post('/api/outfit', (req, res) => {
  db.addOutfit(req.body.items, req.body.outfitProperties, 1);
  res.sendStatus(200);
});

app.delete('/api/outfit', (req, res) => {
  db.removeOutfit(req.query.id, 1);
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
  var userData = req.body;
  bcrypt.hash(userData.password, null, null, (error, hash) => {
    if (error) {
      res.status(500).send('Sorry, there was a server error');
    }
    userData.password = hash;
  });
  db.checkUserExists(userData.email, (result, error) => {
    if (error) {
      res.status(500).send('Sorry, there was a server error');
    }
    if (result) {
      res.redirect(409, '/signup');
    } else {
      db.createUser(req.body, (result, error) => {
        if (error) {
          res.redirect(500, '/signup');
        } else {
          req.session.regenerate(() => {
            req.session.user = result;
            res.status(200).end();
          });
        }
      });
    }
  });
});

app.post('/login', (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  db.getUser(email, (result, error) => {
    if (error) {
      res.redirect(500, '/login');
    } else if (!result) {
      res.status(401).send('An account with that email does not exist in our database');
    } else {
      bcrypt.compare(password, result.hash, (err, match) => {
        if (!match) {
          res.status(401).send('Password incorrect. Please try again');
        } else {
          req.session.regenerate(() => {
            req.session.user = result;
            res.status(200).end();
          });
        }
      });
    }
  });
});

app.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      res.clearCookie('connect.sid');
      res.redirect('/');
    });
  }
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
  res.sendFile(path.resolve(__dirname, '../../dist/index.html'));
});

app.listen(port, () => {
  console.log('listening on port ' + port);
});
