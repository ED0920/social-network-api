const { Schema, model } = require('mongoose');

// Create schema

const userSchema = new Schema({
    username: {
        type:String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unqiue: true,
        required: true,
        //match email address
        match: [/.+\@.+\..+/],
    },
    thoughts:[{
        type: Schema.Types.OnjectId,
        ref: thoughts,
    }],
    friends: {
        type: Schema.Types.OnjectId,
        ref: user,
    },
}, 
{
 // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
        virtuals: true,
      },
      id: false,
});


// create a virtual to count friends
userSchema.virtual('countFriends')
// get function to retrieve username
.get(function () {
    return `${this.friends.length}`
});

// intitalize user model
const user = model('user', userSchema);

model.exports = user;