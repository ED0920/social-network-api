const { Schema, model, Types } = require('mongoose');
const moment = require('moment');
//create reaction schema
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
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
},
    {
        toJSON: {
            getters: true
        }
    });

const Reaction = model('reaction', reactionSchema)

module.exports = Reaction;