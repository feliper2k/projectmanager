'use strict';

const CRUD = require('./crud');
const MESSAGES = require('./utils').MESSAGES;

const Tasks = CRUD('projects');
const _ = require('lodash');

function getTaskCollection(req, res) {
    const limit = req.query.limit || null;
    const projectId = parseInt(req.params.pid) || null;
    const constraint = projectId ? [`project = ${projectId}`] : null;

    Tasks.find(constraint, limit).then((matches) => {
        res.json(matches);
    });
}

function getTaskById(req, res) {
    Tasks.findById(req.params.id).then((project) => {
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
            owner: req.token.userid
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
    api.get('/tasks/', getTaskCollection);
    api.get('/tasks/:id', getTaskById);
    api.post('/tasks/', createTask);
    api.put('/tasks/:id', updateTask);
    api.delete('/tasks/:id', deleteTask);

    api.get('/project/:pid/tasks/', getTaskCollection);
    api.post('/project/:pid/tasks/', createTask);
};
