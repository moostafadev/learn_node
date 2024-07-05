"use strict";
// Local Server => Request & Response
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// const http = require("http"); // CommonJs
const http = __importStar(require("http")); // ES Module
const PORT = 5000;
const server = http.createServer((req, res) => {
    res.writeHead(200, { "content-type": "application/json" });
    const data = [
        { id: 1, title: "First product" },
        { id: 2, title: "Second product" },
        { id: 3, title: "Third product" },
        { id: 4, title: "Fourth product" },
    ];
    res.write(JSON.stringify(data));
    res.end();
});
server.listen(PORT); // URL => http://localhost:5000
console.log(`Running Server => http://localhost:${PORT}`);
