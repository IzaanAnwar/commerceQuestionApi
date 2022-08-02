"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connectDB_1 = __importDefault(require("./services/connectDB"));
const adminRoute_1 = __importDefault(require("./routes/adminRoute"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use('/admin', adminRoute_1.default);
const PORT = process.env.PORT ? process.env.PORT : 3100;
app.listen(PORT, () => {
    (0, connectDB_1.default)(process.env.MONGODB_PASSWORD);
    console.log(`[CONNECTED_TO_SERVER] -[PORT::${PORT}]`);
});
