'use strict';

const CRUD = require('./crud');
const MESSAGES = require('./utils').MESSAGES;

const Tasks = CRUD('tasks');
const TasksView = CRUD('tasks-view');
const _ = require('lodash');

function sanitizeBody(req, res, next) {
    // an array of columns whitelisted (i.e. included) in create/update routines
    const PURE_COLUMNS = [
        'id', 'project', 'assigner', 'assignee', 'name',
        'description', 'status', 'progress'
    ];

    // debugger;

    if(_.includes(['POST', 'PUT'], req.method)) {
        req.body = _.pick(req.body, PURE_COLUMNS);
    }
    next();
}

function getTaskCollection(req, res) {
    const limit = req.query.limit || null;
    const projectId = parseInt(req.params.pid) || null;
    const constraint = projectId ? [`project = ${projectId}`] : null;

    TasksView.find(constraint, limit).then(matches => res.json(matches));

    // Tasks.totalCount(projectId).then(count => {
    //     res.set({
    //         'X-Total-Count': count
    //     });
    //
    //     return Users.find(null, limit);
    // })
}

function getTaskById(req, res) {
    TasksView.findById(req.params.id).then((project) => {
        if(project) {
            res.json(project);
        }
        else {
            res.status(404).end();
        }
    });
}

function createTask(req, res) {
    const projectId = parseInt(req.params.pid) || null;

    if(req.token.admin) {
        let parentProject;

        if(projectId) {
            parentProject = {
                project: projectId
            };
        }

        const newTask = _.assign(req.body, {
            assigner: req.token.userid
        }, parentProject);

        return Tasks.create(newTask)
        .then((newRow) => res.json(newRow))
        .catch((error) => res.json(error));
    }

    return res.status(403).send(MESSAGES.NOADMIN);
}

function updateTask(req, res) {
    const resourceId = req.params.id || req.body.id;
    const patch = _.assign(req.body, {
        id: resourceId
    });

    if(req.token.admin) {
        Tasks.update(patch)
        .then((updated) => res.json(updated))
        .catch((error) => res.json(error));
    }
    else {
        return res.status(403).send(MESSAGES.NOADMIN);
    }
}

function deleteTask(req, res) {
    if(req.token.admin) {
        Tasks.deleteId(req.params.id)
        .then((deleted) => res.json(deleted))
        .catch((error) => res.json(error));
    }
    else {
        return res.status(403).send(MESSAGES.NOADMIN);
    }
}

module.exports = function (api) {
    api.use('/tasks/', sanitizeBody);
    api.use('/project/:pid/tasks/', sanitizeBody);

    api.get('/tasks/', getTaskCollection);
    api.get('/tasks/:id', getTaskById);
    api.post('/tasks/', createTask);
    api.put('/tasks/:id', updateTask);
    api.delete('/tasks/:id', deleteTask);

    api.get('/project/:pid/tasks/', getTaskCollection);
    api.post('/project/:pid/tasks/', createTask);
};
