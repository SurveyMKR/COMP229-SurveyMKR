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
router.post('/survey-add', AuthGuard,ProcessSurveysAddPage);
router.post('/survey-edit/:id', AuthGuard,ProcessSurveysEditPage);
router.get('/survey-edit/:id', AuthGuard,DisplaySurveysEditPage);
router.get('/survey-delete/:id', AuthGuard,ProcessSurveysDelete);

export default router;