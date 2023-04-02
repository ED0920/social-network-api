const {Schema, model, Types} = require ('mongoose');

const moment= require('moment');


//create reaction schema
const reactionSchema = new Schema ({
reactionId: {
    type: Schema.Types.ObjectId,
    default: new Types.ObjectId(),
 },
reactionBody: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
},
username:{
    type: String,
    required: true,
},
createdAt:{
    type: Date,
    default: Date.now,
    get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
},
},
{
    toJSON: {
        getters: true
    }
});

// create thought schema
const thoughtSchema = new Schema({
    thoughttext:{
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    username: {
        type: String,
        required: true,
    },
    reactions: 
        [reactionSchema]
},
{
    toJSON:{
        getter: true,
        virtuals: true
    },
    id: false,
}
);

thoughtSchema.virtual('reactionCount').get( function () {
    return this.reactions.length;
});

const thought = model('thought', thoughtSchema);

model.exports = thought;