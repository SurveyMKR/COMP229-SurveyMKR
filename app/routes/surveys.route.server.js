import { Router } from "express";

import {  DisplaySurveysList, 
    DisplaySurveysAddPage, 
    ProcessSurveysAddPage, 
    ProcessSurveysEditPage, 
    DisplaySurveysEditPage, 
    ProcessSurveysDelete } from "../controllers/surveys.controller.server.js";

import { AuthGuard } from "../utils/index.js";

const router = Router();

router.get('/survey-list', DisplaySurveysList);
router.get('/survey-add', AuthGuard, DisplaySurveysAddPage);
router.get('/survey-add/:type', AuthGuard, DisplaySurveysAddPage);
router.post('/survey-add/:type', AuthGuard, DisplaySurveysAddPage);
router.post('/survey-add/:type/:questionCount', AuthGuard,ProcessSurveysAddPage);
router.post('/survey-edit/:id/:type', AuthGuard, DisplaySurveysEditPage);
router.get('/survey-edit/:id/:type', AuthGuard, DisplaySurveysEditPage);
router.post('/survey-edit/:id/:type/:questionCount', AuthGuard, ProcessSurveysEditPage);
router.get('/survey-delete/:id', AuthGuard, ProcessSurveysDelete);


export default router;