'use strict';

const CRUD = require('./crud');
const MESSAGES = require('./utils').MESSAGES;

const ProjectsView = CRUD('projects-view');
const Projects = CRUD('projects');
const _ = require('lodash');
const moment = require('moment');

function getProjectCollection(req, res) {
    const limit = req.query.limit;

    ProjectsView.find(null, limit).then((matches) => {
        res.json(matches);
    });
}

function getProjectById(req, res) {
    ProjectsView.findById(req.params.id).then((project) => {
        if(project) {
            res.json(project);
        }
        else {
            res.status(404).end();
        }
    });
}

function createProject(req, res) {
    if(req.token.admin) {
        // verify date before submitting
        const correctDate = Date.parse(req.body.duedate);
        if(!correctDate) return;

        const newProject = _.assign(req.body, {
            owner: req.token.userid,
            duedate: new Date(correctDate).toISOString()
        });

        return Projects.create(newProject)
        .then((newRow) => res.json(newRow))
        .catch((error) => res.json(error));
    }

    return res.status(403).send(MESSAGES.NOADMIN);
}

function updateProject(req, res) {
    const resourceId = req.params.id || req.body.id;
    const patch = _.assign(req.body, {
        id: resourceId
    });

    if(req.token.admin) {
        Projects.update(patch)
        .then((updated) => res.json(updated))
        .catch((error) => res.json(error));
    }
    else {
        return res.status(403).send(MESSAGES.NOADMIN);
    }
}

function deleteProject(req, res) {
    if(req.token.admin) {
        Projects.deleteId(req.params.id)
        .then((deleted) => res.json(deleted))
        .catch((error) => res.json(error));
    }
    else {
        return res.status(403).send(MESSAGES.NOADMIN);
    }
}

module.exports = function (api) {
    api.get('/projects/', getProjectCollection);
    api.get('/projects/:id', getProjectById);
    api.post('/projects/', createProject);
    api.put('/projects/:id', updateProject);
    api.delete('/projects/:id', deleteProject);
};
