"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const electron_updater_1 = require("electron-updater");
const electron_log_1 = __importDefault(require("electron-log"));
function CheckForUpdates(mainWindow) {
    return __awaiter(this, void 0, void 0, function* () {
        electron_updater_1.autoUpdater.autoDownload = true;
        electron_updater_1.autoUpdater.allowDowngrade = true;
        electron_updater_1.autoUpdater.autoRunAppAfterInstall = true;
        electron_log_1.default.transports.file.level = "debug";
        electron_updater_1.autoUpdater.logger = electron_log_1.default;
        electron_updater_1.autoUpdater.checkForUpdates();
        electron_updater_1.autoUpdater.on("update-available", (info) => {
            new electron_1.Notification({
                title: `ToListen está atualizando!`,
                body: `O programa será reiniciado em breve para aplicação da versão ${info.version}.`,
                silent: false,
                urgency: "normal"
            }).show();
        });
        yield new Promise(resolve => {
            electron_updater_1.autoUpdater.on("update-not-available", resolve);
            electron_updater_1.autoUpdater.on("update-downloaded", (ev) => {
                electron_updater_1.autoUpdater.quitAndInstall(true, true);
                resolve(null);
            });
        });
    });
}
exports.default = CheckForUpdates;
