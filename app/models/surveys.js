import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SurveySchema = new Schema({
    name: String,
    type: String, 
    questions: [],
    answers: []
}, 
{
    timestamps: true,
    collection: 'surveys'
});

export default mongoose.model('Surveys', SurveySchema); 