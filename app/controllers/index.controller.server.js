import { UserDisplayName } from "../utils/index.js";

export function displayHomePage(req, res, next) {
    res.render('index', { title: 'Welcome to Survey MKR', page: 'home', displayName: UserDisplayName(req)} );
};




