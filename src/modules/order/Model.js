import mongoose from 'mongoose';

const Schema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,

    name: {
      type: String,
      required: true,
    },

    clientPrice: {
      type: Number,
      required: true,
    },

    clientPaid: {
      type: Number,
      required: true,
    },

    clientDebt: {
      type: Number,
      required: true,
    },

    vendorPrice: {
      type: Number,
      required: true,
    },

    vendorPaid: {
      type: Number,
      required: true,
    },

    vendorDebt: {
      type: Number,
      required: true,
    },

    notes: {
      type: String,
      required: false,
    },

    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
      required: true,
    },

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

export default mongoose.model('Order', Schema);
