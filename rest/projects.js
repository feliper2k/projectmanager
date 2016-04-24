'use strict';

const CRUD = require('./crud');
const MESSAGES = require('./utils').MESSAGES;

const ProjectsView = CRUD('projects-view');
const Projects = CRUD('projects');
const _ = require('lodash');
const moment = require('moment');

function getProjectCollection(req, res) {
    const limit = req.query.limit;

    ProjectsView.totalCount().then(count => {
        res.set({
            'X-Total-Count': count
        });

        return ProjectsView.find(null, limit);
    })
    .then(matches => res.json(matches));
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
        // format date in Polish locale
        req.body.duedate = req.body.duedate.replace(/(\d+)\/(\d+)\/(\d+)/, '$2/$1/$3');

        // verify date before submitting
        const correctDate = Date.parse(req.body.duedate);
        if(!correctDate) {
            return res.json({
                success: false,
                error: 'incorrect date format'
            });
        }

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
