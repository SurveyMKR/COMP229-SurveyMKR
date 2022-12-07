import { Router } from "express";

import {  DisplaySurveysList, 
    DisplaySurveysAddPage, 
    ProcessSurveysAddPage, 
    ProcessSurveysEditPage, 
    DisplaySurveysEditPage, 
    ProcessSurveysDelete,
    DisplaySurveysRespondPage, 
    ProcesSurveysRespondPage} from "../controllers/surveys.controller.server.js";

import { AuthGuard } from "../utils/index.js";

const router = Router();

router.get('/survey-list', DisplaySurveysList);
router.get('/survey-add', AuthGuard, DisplaySurveysAddPage);
router.get('/survey-add/:type', AuthGuard, DisplaySurveysAddPage);
router.post('/survey-add/:type', AuthGuard, DisplaySurveysAddPage);
router.post('/survey-add/:type/:mcCount/:adCount/:saCount', AuthGuard,ProcessSurveysAddPage);
router.post('/survey-edit/:id/:type', AuthGuard, DisplaySurveysEditPage);
router.get('/survey-edit/:id/:type', AuthGuard, DisplaySurveysEditPage);
//for editing and selecting no question types - prevents errors
router.get('/survey-edit/:id', AuthGuard, DisplaySurveysEditPage);
router.post('/survey-edit/:id/:type/:mcCount/:adCount/:saCount', AuthGuard, ProcessSurveysEditPage);
router.get('/survey-delete/:id', AuthGuard, ProcessSurveysDelete);
router.get('/survey-respond/:id/:type', DisplaySurveysRespondPage);
router.post('/survey-respond/:id/:type/:mcCount/:adCount/:saCount', ProcesSurveysRespondPage);

export default router;