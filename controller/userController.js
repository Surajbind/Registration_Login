const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user.js');
const { json } = require('body-parser');
const Session = require('../model/session.js');

const register = async (req, res) => {
  console.log("Hi There");
  try {
    // Extract user details from request body
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const newUser = await User.create({ username, email, password: hashedPassword });

    // You may want to generate and send a JWT token for immediate login

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const login = async (req, res) => {
  try {
    
    let {email,password} = req.body;
    let isAvailable = await User.findOne({
      where: {
        email:email
      }
    })

    if(!isAvailable)
    {
      return res.status(400).message({ message: 'User Does not Exist' });      
    }
    // Checking user password
    let passMatch = bcrypt.compare(password,isAvailable.password)
    if(!passMatch)
    {
      return res.status(400).message({ message: 'Password is incorrect' });      
    }

    // const tokenId =   isAvailable.dataValues.id;
    let token = jwt.sign({...isAvailable},process.env.jwt_secrectKey,{expiresIn:'1h'})

    await Session.create({
      userId : isAvailable.id,
      jwt :token,
      status : "Valid" // remove
    })

    const options = {
      expires: new Date(
        Date.now() +  60 * 60 * 1000
      ),
      httpOnly: true,
    };

    return res.cookie('jwttoken', token, options).json({
      success: true,
      token
    });

  } catch (error) {
    console.error('Error during user login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const logout = async (req, res) => {
  // res.cookie('token', '', {
  //   httpOnly: true,
  //   expires: new Date(0),
  //   secure: process.env.NODE_ENV === 'production', 
  // });

  // res.status(200).json({ message: 'Logout successful' });
  res.status(200).clearCookie('jwttoken').json('cookie cleared');



};

module.exports = {
  register,
  login,
  logout,
};
