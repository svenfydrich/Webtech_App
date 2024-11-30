"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const travels_1 = __importDefault(require("./routes/travels"));
const app = (0, express_1.default)();
const PORT = 1337;
//Configure Middleware and Routes
app.use(express_1.default.json());
app.use(express_1.default.static('public'));
app.use('/api/travels', travels_1.default);
//Run server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
