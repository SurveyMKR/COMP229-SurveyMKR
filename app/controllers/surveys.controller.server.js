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
    let type = req.params.type;
    let questionCount = req.body.questionCount
   
    res.render('index', { title: 'Add Survey', page: 'surveys/add', survey: {} , displayName: UserDisplayName(req), surveyType: type, questionCount: questionCount});
    
}

export function ProcessSurveysAddPage(req, res, next){
    let questionCount = req.params.questionCount
    console.log(questionCount);
    let questionList = [];
    for (let i = 0; i < questionCount; i++) {
        questionList[i] = eval('req.body.question' + (i + 1));
        console.log(questionList[i]);
       
        
    }
    let answerList = [];

    if (req.params.type == 'mc') {
        for (let i = 0; i < questionCount * 4; i++) {
            answerList[i] = eval('req.body.answer' + (i + 1));
        }
    }
    if (req.params.type == 'ad') {
        for (let i = 0; i < questionCount * 2; i++) {
            if (i % 2 == 0) {
                answerList[i] = 'Agree';
            }
            else {
                answerList[i] = 'Disagree';
            }
            
        }
    }
    
    let newSurvey = surveyModel({
        name: req.body.surveyName,
        type: req.params.type,
        questions: questionList,
        answers: answerList
        
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
    let type = req.params.type;
    surveyModel.findById(id, (err, survey) => {
        if(err){
            console.error(err);
            res.end(err);
        }
        let questionCount
        if (req.body.questionCount) {
            questionCount = req.body.questionCount;
        }
        else {
            questionCount = survey.questions.length;
        }
       
        res.render('index', { title: 'Edit Survey', page: 'surveys/edit', survey: survey, displayName: UserDisplayName(req), surveyType: type, questionCount: questionCount});
    });    
}

export function ProcessSurveysEditPage(req, res, next){

    let id = req.params.id;
    let questionList = [];
    let questionCount = req.params.questionCount;
    for (let i = 0; i < questionCount; i++) {
        questionList[i] = eval('req.body.question' + (i + 1));
        console.log(questionList[i]);  
    }
    
    let answerList = [];

    if (req.params.type == 'mc') {
        for (let i = 0; i < questionCount * 4; i++) {
            answerList[i] = eval('req.body.answer' + (i + 1));
        }
    }
    
    if (req.params.type == 'ad') {
        for (let i = 0; i < questionCount * 2; i++) {
            if (i % 2 == 0) {
                answerList[i] = 'Agree';
            }
            else {
                answerList[i] = 'Disagree';
            }
            
        }
    }
    let newSurvey = surveyModel({
        _id: req.body.id,
        name: req.body.surveyName,
        type: req.params.type, 
        questions: questionList,
        answers: answerList
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

