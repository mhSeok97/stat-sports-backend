"use strict";
let __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.axiosWithCookie = void 0;
const axios_1 = __importDefault(require("axios"));
const axiosInstance = axios_1.default.create();
const axiosWithCookie = async (config, cookies) => {
    try {
        if (cookies) {
            config.headers = config.headers || {};
            config.headers["Cookie"] = cookies;
        }
        const response = await axiosInstance.request(config);
        return response;
    } catch (error) {
        throw error;
    }
};
exports.axiosWithCookie = axiosWithCookie;
// # sourceMappingURL=axiosUtil.js.map