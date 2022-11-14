import surveysModel from '../../models/surveys.js'

export function GetList(req, res, next){
    surveysModel.find((err, surveysCollection) => {
        if(err){
            console.error(err);
            res.end(err);
        }

        res.json({
            success: true,
            msg: 'Success',
            surveys: surveysCollection, 
            user: req.user
        });
    });
}

export function Get(req, res, next){
    let id = req.params.id;

    surveysModel.findById(id, (err, survey) => {
        if(err){
            console.error(err);
            res.end(err);
        }

        return res.json({
            success: true, 
            msg: 'Success',
            survey, 
            user: req.user
        })
    })
}

export function Add(req, res, next){
    let newSurvey = new surveysModel({
        ...req.body
    });

    surveysModel.create(newSurvey, (err) => {
        if(err){
            console.error(err);
            res.end(err);
        }

        // survey added successfully
        res.json({
            success: true, 
            msg: 'Success',
            survey: newSurvey
        })
    })
}

export function Edit(req, res, next){
    let id = req.params.id;

    let updatedSurvey = new surveysModel({
        "_id": id, 
        ...req.body
    });

    surveysModel.updateOne({_id: id}, updatedSurvey, (err) => {
        if(err){
            console.error(err);
            res.end(err);
        }

        res.json({
            success: true,
            msg: 'Success',
            survey: updatedSurvey
        })
    })

   
}

export function Delete(req, res, next){
    let id = req.params.id;

    surveysModel.remove({_id: id}, (err) => {
        if(err){
            console.error(err);
            res.end(err);
        }

        res.json({
            success: true,
            msg: 'Deleted Succesfully'
        })
    })
}