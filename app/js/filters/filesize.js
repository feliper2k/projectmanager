function FileSize() {
    const multipliers = ['B','KB','MB','GB','TB'];

    return function(input) {
        if(typeof input === 'number') {
            input = input.toFixed(0);
        }

        const oomDegree = 3;
        const oom = Math.floor((input.length-1)/oomDegree);
        return input.substr(0, input.length-oomDegree*oom) + ' ' + multipliers[oom];
    };
}

export default {
    name: 'filesize',
    fn: FileSize
};
