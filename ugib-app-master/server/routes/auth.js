const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const User = require("../routes/models/user");
const sequelize = require("../routes/db");
const {My_user, UserInfo} = require("../routes/models/my_user");



mongoose.connect("mongodb://192.168.6.201:27017/auth");

const app = express();



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 5000;

app.post("/signup", (req, res, next) => {
  // const newUser = new User({
  //   username: req.body.email,
  //   name: req.body.name,
  //   password: bcrypt.hashSync(req.body.password, 10),
  //   role: req.body.role,
  // });
  buff = req.body.name.split(" ");
  first_name = buff[1]  + " " + buff[2];
  last_name = buff[0];

  async function create_user(){
      const t =  await sequelize.transaction();
      try {
      const user = await My_user.create({username:req.body.email, last_name:last_name, first_name: first_name, 
        password: bcrypt.hashSync(req.body.password, 10)
      },  { transaction: t });
      const user_info =  await UserInfo.create({user_id : user.id, departament : req.body.departament, position: req.body.position }, { transaction: t });
      t.commit();
      return res.status(200).json({
            title: "Success",
          });
      } catch (error) {
        
        console.log(error)
        t.rollback();
        return res.status(400).json({
                title: "Error",
                error: "Email in use",
              });
      }
  };
    create_user();
  // newUser.save((err) => {
  //   if (err) {
  //     return res.status(400).json({
  //       title: "Error",
  //       error: "Email in use",
  //     });
  //   }
  //   return res.status(200).json({
  //     title: "Success",
  //   });
  // });
});

app.post("/login", (req, res, next) => {
  (async () => {
    await My_user.findOne( {where : {username: req.body.email}}).then(function(user){
      if (!user) {
        return res.status(401).json({
          title: "User not found",
          error: "Invalid credentials",
        })}
      if (!bcrypt.compareSync(req.body.password, user.password)) {
          return res.status(401).json({
            title: "login failed",
            error: "invalid credentials",
          });     
      }
      let token = jwt.sign({ userId: user.id }, "secretkey");
      if (user.is_staff){
        role = "chief";
      }else{
        role = "restricted";
      };

        return res.status(200).json({
          title: "login success!",
          token: token,
          role: role,
          userId: user.id
        });
    })
          .catch(function (err) {
        return res.status(500).json({
          title: "server error",
          error: err,
        });
    });
  })();
  // User.findOne({ email: req.body.email }, (err, user) => {
  //   if (err)
  //     return res.status(500).json({
  //       title: "server error",
  //       error: err,
  //     });
  //   //incorrect user
  //   if (!user) {
  //     return res.status(401).json({
  //       title: "User not found",
  //       error: "Invalid credentials",
  //     });
  //   }
  //   //incorrect password
  //   if (!bcrypt.compareSync(req.body.password, user.password)) {
  //     return res.status(401).json({
  //       title: "login failed",
  //       error: "invalid credentials",
  //     });
  //   }
  //   //all is correct - craete a JWT token and go to landing
  //   let token = jwt.sign({ userId: user._id }, "secretkey ");
  //   return res.status(200).json({
  //     title: "login success!",
  //     token: token,
  //     role: user.role,
  //   });
  // });
});
// user info
app.get("/user", (req, res, next) => {
  let token = req.headers.token;
  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err)
      
      return res.status(401).json({
        title: "unauthtorized",
      });
    //token is valid
    User.findOne({ _id: decoded.userId }, (err, user) => {
      if (err) return console.log(err);
      return res.status(200).json({
        title: "user grabbed",
        user: {
          email: user.email,
          name: user.name,
        },
      });
    });
  });
});

app.get("/", (req, res, next) => {
  res.send("Express auth server is running!");
});

app.listen(port, (err) => {
  if (err) return console.log(err);
  console.log(`Auth server running on port ${port}`);
});
