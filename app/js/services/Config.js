function ConfigService() {
    const config = {
        apiPrefix: 'http://localhost:8001'
    };

    return config;
}

export default {
    name: 'ConfigService',
    fn: ConfigService
};
