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
    username: {
        type: String,
        required: true,
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

// create thought schema
const thoughtSchema = new Schema({
    thoughtText: {
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
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    reactions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'reaction',
        }
    ]
},
    {
        toJSON: {
            getter: true,
            virtuals: true
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

thoughtSchema.virtual('username').get(function () {
    return this.user.username;
});

const Thought = model('thought', thoughtSchema);
const Reaction = model('reaction', reactionSchema)

module.exports = Thought;