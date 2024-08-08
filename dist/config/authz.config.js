"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthzConfig = void 0;
const getAuthzConfig = () => {
    return {
        host: process.env.AUTHZ_HOST_URL,
        client: "test-client",
        adminRole: "admin",
        getUrlFetchingAdminUser: function () {
            return `${this.host}/authz/clients/${this.client}/roles/${this.adminRole}/users`;
        },
    };
};
exports.getAuthzConfig = getAuthzConfig;
// # sourceMappingURL=authz.config.js.map