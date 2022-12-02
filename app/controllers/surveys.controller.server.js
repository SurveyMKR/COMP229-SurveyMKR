import surveyModel from '../models/surveys.js';
import { UserDisplayName } from '../utils/index.js';

export function DisplaySurveysList(req, res, next){
    surveyModel.find(function(err, surveysCollection) {
        if(err){
            console.error(err);
            res.end(err);
        }

        res.render('index', {title: 'Survey List', page: 'surveys/list', surveys: surveysCollection, displayName: UserDisplayName(req)});
    });
   
}

export function DisplaySurveysAddPage(req, res, next){
    let type = req.params.type;
    let mcCount = req.body.mcCount;
    let adCount = req.body.adCount;
    let saCount = req.body.saCount;
   
    res.render('index', { title: 'Add Survey', page: 'surveys/add', survey: {} , displayName: UserDisplayName(req), surveyType: String(type), mcCount: mcCount, adCount: adCount, saCount: saCount });
    
}

export function ProcessSurveysAddPage(req, res, next){
    let mcCount = req.params.mcCount;
    let adCount = req.params.adCount;
    let saCount = req.params.saCount
    
    let mcQuestionList = [];
    if (req.params.type.includes('mc')) {
        for (let i = 0; i < mcCount; i++) {
            mcQuestionList[i] = eval('req.body.mcQuestion' + (i + 1));
        }
    }

    let mcAnswerList = [];
    if (req.params.type.includes('mc')) {
        for (let i = 0; i < mcCount * 4; i++) {
            mcAnswerList[i] = eval('req.body.mcAnswer' + (i + 1));
        }
    }

    let adQuestionList = [];
    if (req.params.type.includes('ad')) {
        for (let i = 0; i < adCount; i++) {
            adQuestionList[i] = eval('req.body.adQuestion' + (i + 1));   
     }
    }
    
    let saQuestionList = [];
    if (req.params.type.includes('sa')) {
        for (let i = 0; i < saCount; i++) {
            saQuestionList[i] = eval('req.body.saQuestion' + (i + 1));   
        }

    }
    
    let newSurvey = surveyModel({
        name: req.body.surveyName,
        type: req.params.type,
        mcQuestions: mcQuestionList,
        mcAnswers: mcAnswerList,
        adQuestions: adQuestionList,
        saQuestions: saQuestionList
        
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
        

        let mcCount;
        if (req.body.mcCount) {
            mcCount = req.body.mcCount;
        }
        else {
            mcCount = survey.mcQuestions.length;
        }
       
        let adCount;
        if (req.body.adCount) {
            adCount = req.body.adCount;
        }
        else {
            adCount = survey.adQuestions.length;
        }

        let saCount;
        if (req.body.saCount) {
            saCount = req.body.saCount;
        }
        else {
            saCount = survey.saQuestions.length;
        }
        res.render('index', { title: 'Edit Survey', page: 'surveys/edit', survey: survey, displayName: UserDisplayName(req), surveyType: String(type), mcCount: mcCount, adCount: adCount, saCount: saCount });
        
    });
        
}

export function ProcessSurveysEditPage(req, res, next){

    let mcCount = req.params.mcCount;
    let adCount = req.params.adCount;
    let saCount = req.params.saCount
  
    let mcQuestionList = [];
    if (req.params.type.includes('mc')) {
        for (let i = 0; i < mcCount; i++) {
            mcQuestionList[i] = eval('req.body.mcQuestion' + (i + 1));
           
        }
    }

    let mcAnswerList = [];
    if (req.params.type.includes('mc')) {
        for (let i = 0; i < mcCount * 4; i++) {
            mcAnswerList[i] = eval('req.body.mcAnswer' + (i + 1));
        }
    }

    let adQuestionList = [];
    if (req.params.type.includes('ad')) {
        for (let i = 0; i < adCount; i++) {
            adQuestionList[i] = eval('req.body.adQuestion' + (i + 1));   
     }
    }

    let saQuestionList = [];
    if (req.params.type.includes('sa')) {
        for (let i = 0; i < saCount; i++) {
            saQuestionList[i] = eval('req.body.saQuestion' + (i + 1));   
        }
    }
    
    
    
    let newSurvey = surveyModel({
        _id: req.params.id,
        name: req.body.surveyName,
        type: req.params.type,
        mcQuestions: mcQuestionList,
        mcAnswers: mcAnswerList,
        adQuestions: adQuestionList,
        saQuestions: saQuestionList
        
    });

    let id = req.params.id;
    surveyModel.updateOne({_id: id }, newSurvey, (err, Survey) => {
        if(err){
            console.error(err);
            res.end(err);
        };

        res.redirect('/survey-list')
    } );
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

export function DisplaySurveysRespondPage(req, res, next) {
    let id = req.params.id;
    let type = req.params.type;

    surveyModel.findById(id, (err, survey) => {
        if(err){
            console.error(err);
            res.end(err);
        }
        

        let mcCount = survey.mcQuestions.length;
       
        let adCount = survey.adQuestions.length;
       
        let saCount = survey.saQuestions.length;;
       
        res.render('index', { title: 'Respond to Survey', page: 'surveys/respond', survey: survey, displayName: UserDisplayName(req), surveyType: String(type), mcCount: mcCount, adCount: adCount, saCount: saCount });
        
    });
}
export function ProcesSurveysRespondPage(req, res, next) {
    let mcCount = req.params.mcCount;
    let adCount = req.params.adCount;
    let saCount = req.params.saCount
    let id = req.params.id;

    let mcResponseList = [];
    if (req.params.type.includes('mc')) {
        for (let i = 0; i < mcCount * 4; i++) {
            mcResponseList[i] = eval('req.body.mcResponse' + (i + 1));
        }
    }

    let adResponseList = [];
    if (req.params.type.includes('ad')) {
        for (let i = 0; i < adCount; i++) {
            adResponseList[i] = eval('req.body.adResponse' + (i + 1));   
     }
    }

    let saResponseList = [];
    if (req.params.type.includes('sa')) {
        for (let i = 0; i < saCount; i++) {
            saResponseList[i] = eval('req.body.saResponse' + (i + 1));   
        }
    }
    
    surveyModel.findById(id, (err, survey) => {
        if(err){
            console.error(err);
            res.end(err);
        }
    
        let newSurvey = surveyModel({
            _id: id,
            type: survey.type,
            name: req.body.surveyName,
            mcQuestions: survey.mcQuestions,
            mcAnswers: survey.mcAnswers,
            mcResponses: mcResponseList,
            adQuestions: survey.adQuestions,
            adResponses: adResponseList,
            saQuestions: survey.saQuestions,
            saResponses: saResponseList
            
        });

    
        surveyModel.updateOne({_id: id }, newSurvey, (err, Survey) => {
            if(err){
                console.error(err);
                res.end(err);
            };

            res.redirect('/survey-list')
        } );
    });
}

