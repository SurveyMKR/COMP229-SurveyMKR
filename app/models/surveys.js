import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SurveySchema = new Schema({
    type: String, 
     questions:[ 
        {
            question: String,
            answer1: String,
            answer2: String,
            answer3: String,
            answer4: String
        }
    ]
}, 
{
    timestamps: true,
    collection: 'surveys'
});

export default mongoose.model('Surveys', SurveySchema); 