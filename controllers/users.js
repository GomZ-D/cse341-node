const mongodb = require('../data/database');
// const { unsubscribe } = require('../routes');
const ObjectId = require('mongodb').ObjectId;



//-------------------------------------
//--FUNCTION TO GET ALL THE COLLECTION
//-------------------------------------
const getAll = async (req, res, next) => {
   //swagger.tags=['User']
    try{
      const result = await mongodb.getDatabase().db().collection('users').find();
      result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
      });
    }catch (err) {
      res.status(500).json({message: err.message});
    }
  };
  
  //------------------------------------
  //--FUNCTION TO GET A SINGLE USER
  //------------------------------------
  
  const getSingle = async (req, res, next) => {
    //swagger.tags=['User']
    try{
      const userId = new ObjectId(req.params.id);
      const result = await mongodb
        .getDatabase()
        .db()
        .collection('users')
        .find({ _id: userId });
      result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
      });
    }catch(err) {
      res.status(500).json(err);
  }
  };

//------------------------------------
//--FUNCTION TO CREATE A USER
//------------------------------------

 const createUser = async(req,res) => {
  //swagger.tags=['User']
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday 
  };

    const result = await mongodb
      .getDatabase()
      .db()
      .collection('users')
      .insertOne(user);
      
  if (result.acknowledged) {
    res.status(204).send();
  }else {
    res.status(500).json(result.error || 'Error while Creating User');
  }
}

//------------------------------------
//--FUNCTION TO UPDATE A USER
//------------------------------------

const updateUser = async (req, res) => {
  //swagger.tags=['User']
 const userId = new ObjectId(req.params.id);

 const user = {
  firstName: req.body.firstName,
  lastName: req.body.lastName,
  email: req.body.email,
  favoriteColor: req.body.favoriteColor,
  birthday: req.body.birthday 
 };

 const result = await mongodb
  .getDatabase()
  .db()
  .collection('users')
  .replaceOne({_id: userId}, user); 
 
 if(result.modifiedCount > 0) {
  res.status(204).send();
 } else {
  res.status(500).json(result.error || "Error while Updating User")
 }
}

//------------------------------------
//--FUNCTION TO DELETE A USER
//------------------------------------

const deleteUser = async (req, res) => {
  //swagger.tags=['User']
  const userId = new ObjectId(req.params.id);

  const result = mongodb
  .getDatabase()
  .db()
  .collection('users')
  .deleteOne({_id:userId});

  // console.log(result);

//  if(result.deletedCount > 0) {
  if(result.deletedCount > 0){
  res.status(204).send();
  }else {
  res.status(500).json(result.error || "Error While Deleting User/s")
 }
}

  module.exports = {
    getAll,
    getSingle,
    deleteUser,
    createUser,
    updateUser
  }

