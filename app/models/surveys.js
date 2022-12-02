import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SurveySchema = new Schema({
    name: String,
    type: String, 
    mcQuestions: [],
    mcAnswers: [],
    mcResponses: [],
    adQuestions: [],
    adResponses: [],
    saQuestions: [],
    saResponses: []
    
}, 
{
    timestamps: true,
    collection: 'surveys'
});

export default mongoose.model('Surveys', SurveySchema); 