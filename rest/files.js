'use strict';

const CRUD = require('./crud');
const MESSAGES = require('./utils').MESSAGES;

const Files = CRUD('files');
const FilesView = CRUD('files-view');
const _ = require('lodash');
const upload = require('multer')({
    dest: 'uploads/'
});


function getFileCollection(req, res) {
    const limit = req.query.limit || null;
    const projectId = parseInt(req.params.pid) || null;
    const constraint = projectId ? [`project = ${projectId}`] : null;

    FilesView.find(constraint, limit).then(matches => res.json(
        matches.map(file => _.assign(file, { meta: JSON.parse(file.meta) }))
    ));
}

function getFileById(req, res) {
    FilesView.findById(req.params.id).then(file => {
        if(file) {
            res.json(
                _.assign(file, {
                    meta: JSON.parse(file.meta)
                })
            );
        }
        else {
            res.status(404).end();
        }
    });
}

function createFile(req, res) {
    const projectId = parseInt(req.params.pid) || null;
    debugger;

    if(req.token.admin) {
        let parentProject;

        if(projectId) {
            parentProject = {
                project: projectId
            };
        }

        const newFile = _.assign(req.body, {
            author: req.token.userid,
            name: req.file.originalname,
            uploaded: new Date().toISOString(),
            meta: JSON.stringify(req.file)
        }, parentProject);

        return Files.create(newFile)
        .then((newRow) => res.json(newRow))
        .catch((error) => res.json(error));
    }

    return res.status(403).send(MESSAGES.NOADMIN);
}
//
// function updateFile(req, res) {
//     const resourceId = req.params.id || req.body.id;
//     const patch = _.assign(req.body, {
//         id: resourceId
//     });
//
//     if(req.token.admin) {
//         Files.update(patch)
//         .then((updated) => res.json(updated))
//         .catch((error) => res.json(error));
//     }
//     else {
//         return res.status(403).send(MESSAGES.NOADMIN);
//     }
// }

function deleteFile(req, res) {
    if(req.token.admin) {
        Files.deleteId(req.params.id)
        .then((deleted) => res.json(deleted))
        .catch((error) => res.json(error));
    }
    else {
        return res.status(403).send(MESSAGES.NOADMIN);
    }
}

module.exports = function (api) {
    // api.use('/tasks/', sanitizeBody);
    // api.use('/project/:pid/tasks/', sanitizeBody);

    api.get('/files/', getFileCollection);
    api.get('/files/:id', getFileById);
    api.post('/files/', upload.single('fileData'), createFile);
    api.delete('/files/:id', deleteFile);

    api.get('/projects/:pid/files/', getFileCollection);
    api.post('/projects/:pid/files/', upload.single('fileData'), createFile);
};
