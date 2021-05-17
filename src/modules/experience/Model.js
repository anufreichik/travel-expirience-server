import mongoose from 'mongoose';

const Schema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,

    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String | null,
      required: false,
    },
    city: {
      type: String,
      required: true,
    },
    activities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Activity',
      },
    ],
    accommodations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Accommodation',
      },
    ],
    attractions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attraction',
      },
    ],
    restaurants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    // tags: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Tags',
    //     required: false,
    //   },
    // ],
  },
  { timestamps: {}, versionKey: false },
);

export default mongoose.model('Experience', Schema);
