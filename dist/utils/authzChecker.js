"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthzChecker = void 0;
const authz_config_1 = require("config/authz.config");
const routing_controllers_1 = require("routing-controllers");
class AuthzChecker {
    static isAdmin(userInfo) {
        const roles = userInfo.roles;
        return roles.includes((0, authz_config_1.getAuthzConfig)().adminRole);
    }
    static isOwner(userInfo, targetEmail) {
        return userInfo.email === targetEmail;
    }
    static isOwnerOrAdmin(userInfo, targetEmail) {
        return this.isOwner(userInfo, targetEmail) || this.isAdmin(userInfo);
    }
    static isNotOwner(userInfo, targetEmail) {
        return !this.isOwner(userInfo, targetEmail);
    }
    static isNotAdmin(userInfo) {
        return !this.isAdmin(userInfo);
    }
    static async checkAdmin(userInfo) {
        if (!this.isAdmin(userInfo)) {
            throw new routing_controllers_1.UnauthorizedError("You are not an admin");
        }
    }
    static async checkOwner(userInfo, targetEmail) {
        if (!this.isOwner(userInfo, targetEmail)) {
            throw new routing_controllers_1.UnauthorizedError("You are not the owner");
        }
    }
    static async checkAuthorization(userInfo, targetEmail) {
        if (!this.isOwnerOrAdmin(userInfo, targetEmail)) {
            throw new routing_controllers_1.UnauthorizedError("You are not authorized");
        }
    }
}
exports.AuthzChecker = AuthzChecker;
//# sourceMappingURL=authzChecker.js.map