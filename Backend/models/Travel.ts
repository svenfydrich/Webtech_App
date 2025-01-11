import mongoose, { Schema } from "mongoose";

const CityVisitSchema = new Schema({
  cityName: { type: String, required: true },
  daysSpent: { type: Number, required: true },
});

const GuideSchema = new Schema({
  name: { type: String, required: true },
  languages: { type: [String], required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
});

const TravelSchema = new Schema({
  country: { type: String, required: true },
  duration: { type: Number, required: true },
  cities: [
    {
      cityName: { type: String, required: true },
      daysSpent: { type: Number, required: true },
    },
  ],
  tourGuide: {
    name: { type: String, required: true },
    languages: { type: [String], required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
  },
});

export interface ITravel extends Document {
  country: string;
  duration: number;
  cities: { cityName: string; daysSpent: number }[];
  tourGuide: {
    name: string;
    languages: string[];
    phone: string;
    email: string;
  };
}

export default mongoose.model<ITravel>("Travel", TravelSchema);
