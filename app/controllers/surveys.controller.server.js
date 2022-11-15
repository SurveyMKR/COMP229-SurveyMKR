import surveyModel from '../models/surveys.js';
import { UserDisplayName } from '../utils/index.js';

export function DisplaySurveysList(req, res, next){
    surveyModel.find(function(err, surveysCollection) {
        if(err){
            console.error(err);
            res.end(err);
        }

        res.render('index', {title: 'Survey List', page: 'surveys/list', surveys: surveysCollection, displayName: UserDisplayName(req)});
    })
}

export function DisplaySurveysAddPage(req, res, next){
    res.render('index', { title: 'Add Survey', page: 'surveys/add', survey: {} , displayName: UserDisplayName(req)});
}

export function ProcessSurveysAddPage(req, res, next){
    
    let newSurvey = surveyModel({
        type: "MC",
        questions: [
            {
                question: req.body.question,
                answer1: req.body.answer1,
                answer2: req.body.answer2,
                answer3: req.body.answer3,
                answer4: req.body.answer4
            }
        ]
        
    });

    surveyModel.create(newSurvey, (err, Survey) => {
        if(err){
            console.error(err);
            res.end(err);
        };

        res.redirect('/survey-list')
    } )
}

export function DisplaySurveysEditPage(req, res, next){
    let id = req.params.id;

    surveyModel.findById(id, (err, survey) => {
        if(err){
            console.error(err);
            res.end(err);
        }

        res.render('index', { title: 'Edit Survey', page: 'surveys/edit', survey: survey, displayName: UserDisplayName(req) });
    });    
}

export function ProcessSurveysEditPage(req, res, next){

    let id = req.params.id;
    
    let newSurvey = surveyModel({
        _id: req.body.id,
        type: String, 
        questions:[ 
           {
               question: req.body.question,
               answer1: req.body.answer1,
               answer2: req.body.answer2,
               answer3: req.body.answer3,
               answer4: req.body.answer4
           }
       ]
    });

    surveyModel.updateOne({_id: id }, newSurvey, (err, Survey) => {
        if(err){
            console.error(err);
            res.end(err);
        };

        res.redirect('/survey-list')
    } )
}

export function ProcessSurveysDelete(req, res, next){
    let id = req.params.id;

    surveyModel.remove({_id: id}, (err) => {
        if (err){
            console.error(err);
            res.end(err);
        }

        res.redirect('/survey-list');
    })
}

