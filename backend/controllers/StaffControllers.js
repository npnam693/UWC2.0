import Staff from '../models/Staff.js'

//[GET] /api/staff/
export const StaffList = (req, res, next) => {
    req.render('helo')
}