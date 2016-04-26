function TaskStatus() {
    const statusMap = {
        'new': 'Nowy',
        'in progress': 'W trakcie',
        'done': 'Zakończony'
    };

    return function(input) {
        return statusMap[input];
    };
}

export default {
    name: 'taskstatus',
    fn: TaskStatus
};
