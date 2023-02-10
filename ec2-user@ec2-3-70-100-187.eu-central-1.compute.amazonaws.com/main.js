/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.gateway.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var AppGateway_1;
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppGateway = void 0;
const tslib_1 = __webpack_require__("tslib");
const websockets_1 = __webpack_require__("@nestjs/websockets");
const socket_io_1 = __webpack_require__("socket.io");
const models_1 = __webpack_require__("../../libs/models/src/index.ts");
const socket_io_client_1 = __webpack_require__("socket.io-client");
const common_1 = __webpack_require__("@nestjs/common");
const events_1 = __webpack_require__("../../libs/events/src/index.ts");
const schedule_1 = __webpack_require__("@nestjs/schedule");
let AppGateway = AppGateway_1 = class AppGateway {
    constructor() {
        this.logger = new common_1.Logger(AppGateway_1.name);
        this.tanksMap = new Map();
    }
    save(tank, socket) {
        this.tanksMap.set(socket.id, tank);
        this.logger.log(`${socket.id} saved!`);
    }
    synchronize() {
        this.logger.log(`${events_1.Events.SYNCHRONIZE}. Tanks: ${this.tanksMap.size}.`);
        this.server.emit(events_1.Events.SYNCHRONIZE, Array.from(this.tanksMap.values()));
    }
    handleConnection(socket) {
        this.logger.log(`New connection! Id: ${socket.id}`);
    }
    handleDisconnect(socket) {
        this.logger.log(`Socket was disconnected! Id: ${socket.id}`);
        if (this.tanksMap.has(socket.id)) {
            this.tanksMap.delete(socket.id);
        }
    }
};
tslib_1.__decorate([
    (0, websockets_1.WebSocketServer)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof socket_io_1.Server !== "undefined" && socket_io_1.Server) === "function" ? _a : Object)
], AppGateway.prototype, "server", void 0);
tslib_1.__decorate([
    (0, websockets_1.SubscribeMessage)(events_1.Events.SAVE),
    tslib_1.__param(0, (0, websockets_1.MessageBody)()),
    tslib_1.__param(1, (0, websockets_1.ConnectedSocket)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof models_1.Tank !== "undefined" && models_1.Tank) === "function" ? _b : Object, typeof (_c = typeof socket_io_client_1.Socket !== "undefined" && socket_io_client_1.Socket) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AppGateway.prototype, "save", null);
tslib_1.__decorate([
    (0, schedule_1.Cron)('* * * * * *'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], AppGateway.prototype, "synchronize", null);
AppGateway = AppGateway_1 = tslib_1.__decorate([
    (0, websockets_1.WebSocketGateway)({ cors: { origin: '*' } })
], AppGateway);
exports.AppGateway = AppGateway;


/***/ }),

/***/ "./src/app.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const app_gateway_1 = __webpack_require__("./src/app.gateway.ts");
const schedule_1 = __webpack_require__("@nestjs/schedule");
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [schedule_1.ScheduleModule.forRoot()],
        providers: [app_gateway_1.AppGateway],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ "../../libs/events/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("../../libs/events/src/lib/enums/index.ts"), exports);


/***/ }),

/***/ "../../libs/events/src/lib/enums/events.enum.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Events = void 0;
var Events;
(function (Events) {
    Events["SAVE"] = "SAVE";
    Events["SYNCHRONIZE"] = "SYNCHRONIZE";
})(Events = exports.Events || (exports.Events = {}));


/***/ }),

/***/ "../../libs/events/src/lib/enums/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("../../libs/events/src/lib/enums/events.enum.ts"), exports);


/***/ }),

/***/ "../../libs/models/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("../../libs/models/src/lib/interfaces/index.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../libs/models/src/lib/enums/index.ts"), exports);


/***/ }),

/***/ "../../libs/models/src/lib/enums/direction.enum.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Direction = void 0;
var Direction;
(function (Direction) {
    Direction["LEFT"] = "left";
    Direction["RIGHT"] = "right";
    Direction["BOTTOM"] = "bottom";
    Direction["TOP"] = "top";
})(Direction = exports.Direction || (exports.Direction = {}));


/***/ }),

/***/ "../../libs/models/src/lib/enums/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("../../libs/models/src/lib/enums/direction.enum.ts"), exports);


/***/ }),

/***/ "../../libs/models/src/lib/interfaces/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("../../libs/models/src/lib/interfaces/tank.interface.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../libs/models/src/lib/interfaces/position.interface.ts"), exports);


/***/ }),

/***/ "../../libs/models/src/lib/interfaces/position.interface.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "../../libs/models/src/lib/interfaces/tank.interface.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "@nestjs/common":
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/core":
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/schedule":
/***/ ((module) => {

module.exports = require("@nestjs/schedule");

/***/ }),

/***/ "@nestjs/websockets":
/***/ ((module) => {

module.exports = require("@nestjs/websockets");

/***/ }),

/***/ "socket.io":
/***/ ((module) => {

module.exports = require("socket.io");

/***/ }),

/***/ "socket.io-client":
/***/ ((module) => {

module.exports = require("socket.io-client");

/***/ }),

/***/ "tslib":
/***/ ((module) => {

module.exports = require("tslib");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const core_1 = __webpack_require__("@nestjs/core");
const app_module_1 = __webpack_require__("./src/app.module.ts");
function bootstrap() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        const port = process.env.PORT || 3000;
        yield app.listen(port);
        common_1.Logger.log(`🚀 Application is running on ${port} port`);
    });
}
bootstrap();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map