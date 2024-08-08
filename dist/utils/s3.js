"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImageBuffersFromS3 = exports.getObjectFromS3 = exports.generateDownloadSignedUrl = exports.moveObjects = exports.deleteObject = exports.listAllKeys = exports.s3Bucket = exports.s3Client = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const credential_provider_env_1 = require("@aws-sdk/credential-provider-env");
const credential_provider_web_identity_1 = require("@aws-sdk/credential-provider-web-identity");
const client_sts_1 = require("@aws-sdk/client-sts");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const s3_config_1 = require("config/s3.config");
const logger_1 = require("utils/logger");
const uuid_1 = require("uuid");
exports.s3Client = new client_s3_1.S3Client({
    region: process.env.AWS_REGION,
    credentials: process.env.NODE_ENV === "local"
        ? (0, credential_provider_env_1.fromEnv)()
        : (0, credential_provider_web_identity_1.fromTokenFile)({
            roleAssumerWithWebIdentity: (0, client_sts_1.getDefaultRoleAssumerWithWebIdentity)(),
        }),
});
exports.s3Bucket = s3_config_1.S3Config.bucket;
const listAllKeys = async (prefix) => {
    const keys = [];
    const params = {
        Bucket: s3_config_1.S3Config.bucket,
        Prefix: `${prefix}/`,
        MaxKeys: 20,
    };
    try {
        const data = await exports.s3Client.send(new client_s3_1.ListObjectsV2Command(params));
        if (!data.Contents) {
            return [];
        }
        data.Contents.forEach((item) => {
            if (item.Key !== `${prefix}/`) {
                keys.push(item.Key);
            }
        });
    } catch (err) {
        throw new Error(`Error listing objects: ${err}`);
    }
    return keys;
};
exports.listAllKeys = listAllKeys;
const copyObject = async (oldKey, newKey) => {
    try {
        const copyParams = {
            Bucket: s3_config_1.S3Config.bucket,
            CopySource: encodeURI(`${s3_config_1.S3Config.bucket}/${oldKey}`),
            Key: newKey,
        };
        await exports.s3Client.send(new client_s3_1.CopyObjectCommand(copyParams));
    } catch (err) {
        throw new Error(`Error copying object: ${err}`);
    }
};
const deleteObject = async (key) => {
    try {
        const deleteParams = {
            Bucket: s3_config_1.S3Config.bucket,
            Key: key,
        };
        await exports.s3Client.send(new client_s3_1.DeleteObjectCommand(deleteParams));
    } catch (err) {
        throw new Error(`Error deleting object: ${err}`);
    }
};
exports.deleteObject = deleteObject;
const moveObjects = async (sourcePrefix, destinationPrefix) => {
    try {
        const keys = await (0, exports.listAllKeys)(sourcePrefix);
        for (const key of keys) {
            const newKey = key.replace(sourcePrefix, destinationPrefix);
            await copyObject(key, newKey);
            await (0, exports.deleteObject)(key);
        }
    } catch (err) {
        throw new Error(`Failed to move objects from ${sourcePrefix} to ${destinationPrefix}: ${err}`);
    }
};
exports.moveObjects = moveObjects;
const generateDownloadSignedUrl = async (key, expiresIn = 3600) => {
    try {
        const url = await (0, s3_request_presigner_1.getSignedUrl)(exports.s3Client, new client_s3_1.GetObjectCommand({ Bucket: exports.s3Bucket, Key: key }), { expiresIn });
        return url;
    } catch (err) {
        throw new Error(`Error generating download signed url: ${err}`);
    }
};
exports.generateDownloadSignedUrl = generateDownloadSignedUrl;
const getObjectFromS3 = async (key) => {
    try {
        const data = await exports.s3Client.send(new client_s3_1.GetObjectCommand({
            Bucket: exports.s3Bucket,
            Key: key,
        }));
        const stream = data.Body;
        const chunks = [];
        return new Promise((resolve, reject) => {
            stream.on("data", (chunk) => chunks.push(chunk));
            stream.on("error", reject);
            stream.on("end", () => resolve(Buffer.concat(chunks)));
        });
    } catch (err) {
        throw new Error(`Error getting object from S3: ${err}`);
    }
};
exports.getObjectFromS3 = getObjectFromS3;
const getImageBuffersFromS3 = async (inquiryId, imageUrls) => {
    const attachments = [];
    try {
        for (const url of imageUrls) {
            const key = `inquiry/${inquiryId}/${url}`;
            const fileBuffer = await (0, exports.getObjectFromS3)(key);
            const filename = url;
            if (filename) {
                const cid = (0, uuid_1.v4)();
                attachments.push({ filename, content: fileBuffer, cid });
            }
        }
    } catch (error) {
        logger_1.logger.error(`Failed to get image buffers from S3: ${error.message}`);
    }
    return attachments;
};
exports.getImageBuffersFromS3 = getImageBuffersFromS3;
// # sourceMappingURL=s3.js.map