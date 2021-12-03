const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment");

const User = require("../models/User");
const Webtoken = require("../models/Webtoken");

const isEmailExist = async (req, res, next) => {
  const { email } = req.body;
  if (validator.isEmail(email)) {
    let emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.json({
        success: false,
        message: "Email is already exist!",
      });
    } else {
      next();
    }
  } else {
    return res.json({
      success: false,
      message: "Invalid email",
    });
  }
};

const authenticateUser = async (req, res, next) => {};

const testRoute = async (req, res) => {
  try {
    let receivedData = await User.findOne();
    res.json({
      success: true,
      receivedData,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      err,
    });
  }
};

const login = async (req, res) => {
  try {
    let currentTime = moment().format("YYYY-MM-DD HH:mm");
    let { email, password } = req.body;

    let receivedData = await User.findOne({ email });
    if (receivedData && receivedData.role == "admin") {
      if (receivedData && bcrypt.compareSync(password, receivedData.password)) {
        delete receivedData.password;
        let token = jwt.sign({ data: receivedData }, "tatvasoftpractical");
        let insertToken = new Webtoken({
          token,
          date: currentTime,
          status: 1,
        });
        let tokenSaved = await insertToken.save();
        console.log("tokenSaved", tokenSaved);
        res.json({
          success: true,
          userData: receivedData,
          token,
        });
      } else {
        return res.json({
          success: false,
          message: "Invalid email or password",
        });
      }
    } else {
      return res.json({
        success: false,
        message: "Role missmatch",
      });
    }
  } catch (err) {
    console.log("err", err);
    res.json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

const addUser = async (req, res) => {
  try {
    let { firstName, lastName, email, dob, role, city, state, password } = req.body;
    if (firstName == "" || lastName == "" || dob == "" || role == "" || city == "" || state == "" || password == "") {
      return res.json({
        success: false,
        message: "Incomplete request",
      });
    } else {
      // ADD NEW USER
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      let insertData = new User({
        firstName,
        lastName,
        email,
        dob,
        role,
        city,
        state,
        password: hash,
      });

      await insertData.save();

      return res.json({
        success: true,
        message: "Data inserted!",
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      err,
    });
  }
};

const fetchUsers = async (req, res) => {
  try {
    let fetchedData = await User.find();
    if (fetchedData) {
      res.json({
        success: true,
        data: fetchedData,
      });
    } else {
      res.json({
        success: true,
        data: [],
      });
    }
  } catch (err) {
    res.json({
      success: false,
      message: "something went wrong!",
    });
  }
};

module.exports = { isEmailExist, login, testRoute, addUser, fetchUsers };
