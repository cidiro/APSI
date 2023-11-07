import mongoose from "npm:mongoose@7.6.3";

const { Schema } = mongoose;

const characterSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  race: {
    type: Schema.Types.ObjectId,
    ref: 'Race',
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  abilities: [{
    type: Schema.Types.ObjectId,
    ref: 'Ability',
  }],
}, { timestamps: true });

const Character = mongoose.model('Character', characterSchema);

export default Character;
