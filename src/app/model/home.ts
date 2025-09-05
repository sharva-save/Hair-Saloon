import mongoose, { Schema, Document, models, model } from "mongoose";
import { string } from "zod";

const sliderSchema =  new Schema({
               title:{type:String},
               image:{type:String}
})

const projectsSchema = new Schema({
               title:{type:String},
               description:{type:String},
               link:{type:String}
})

const testimonialsSchema = new Schema({
               quote:{type:String},
               name:{type:String},
               title:{type:String}
})

const groomingSchema  = new Schema({
               slider :{type:[sliderSchema]},
               projects:{type:[projectsSchema]},
               testimonials:{type:[testimonialsSchema]}
})

// const gromming = models.homes || model("Grooming",groomingSchema)

const Grooming = models.Grooming || model("Grooming", groomingSchema);

export default Grooming