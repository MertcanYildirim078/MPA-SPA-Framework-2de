
const express = require("express");
const { Sequelize, Model, DataTypes } = require('sequelize');

const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());

const sequelize = new Sequelize('spa-react7', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch((error) => {
  console.error('Unable to connect to the database:', error);
});


app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });
  
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });


  class Song extends Model { }

  Song.init({
      id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
      },
      Name: {
          type: DataTypes.STRING
      },
      Artist: {
          type: DataTypes.STRING
      },
      Genre: {
          type: DataTypes.STRING
      }
  }, {
      timestamps:false,
      sequelize,
      modelName: 'songs' 
  });

  app.get("/api/songs", (req, res) => {
    Song.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    })
        .then((songs) => {
            res.json(songs);
        })
        .catch((error) => {
            console.error('Error retrieving data:', error);
            res.status(500).json({ error: 'Error retrieving data' });
        });
});


class SavedSong extends Model { }

SavedSong.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Name: {
        type: DataTypes.STRING
    },
    Artist: {
        type: DataTypes.STRING
    },
    Genre: {
        type: DataTypes.STRING
    }
}, {
    timestamps:false,
    sequelize,
    modelName: 'saved_songs_list' 
});

app.get("/api/saved_songs_list", (req, res) => {
  Song.findAll({
      attributes: {
          exclude: ['createdAt', 'updatedAt']
      }
  })
      .then((savedSong) => {
          res.json(savedSong);
      })
      .catch((error) => {
          console.error('Error retrieving data:', error);
          res.status(500).json({ error: 'Error retrieving data' });
      });
});


class User extends Model { }

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Name: {
        type: DataTypes.STRING
    },
    Artist: {
        type: DataTypes.STRING
    },
    Genre: {
        type: DataTypes.STRING
    }
}, {
    timestamps:false,
    sequelize,
    modelName: 'saved_songs_list' 
});

app.get("/api/saved_songs_list", (req, res) => {
  User.findAll({
      attributes: {
          exclude: ['createdAt', 'updatedAt']
      }
  })
      .then((savedSong) => {
          res.json(savedSong);
      })
      .catch((error) => {
          console.error('Error retrieving data:', error);
          res.status(500).json({ error: 'Error retrieving data' });
      });
});