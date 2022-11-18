import StaffRouter from './staffs.js'
// import TaskRouter from './tasks.js'

function route(app) {
    app.use('/staffs', StaffRouter);
    // app.use('/tasks', TaskRouter);
}

export default route;
