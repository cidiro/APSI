import mongoose from "npm:mongoose@7.6.3";

const { Schema } = mongoose;

const raceSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Assuming each race has a unique name
  },
  description: {
    type: String,
    required: true,
  },
  characteristics: {
    type: String, // Or an array or subdocument if more complex
  },
  // Add any other fields that are relevant for the "Race" entity
}, { timestamps: true });

const Race = mongoose.model('Race', raceSchema);

export default Race;
