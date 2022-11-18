import JanitorTask from '../models/JanitorTask.js'

//[GET] /api/tasks/
export const TaskList = (req, res, next) => {
    req.render('helo')
}