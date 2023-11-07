import mongoose from "npm:mongoose@7.6.3";

const { Schema } = mongoose;

const abilitySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Assuming each ability has a unique name
  },
  description: {
    type: String,
    required: true,
  },
  effect: {
    type: String,
    required: true,
  },
  // You can add more fields specific to the abilities here
}, { timestamps: true });

const Ability = mongoose.model('Ability', abilitySchema);

export default Ability;
