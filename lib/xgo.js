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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const exec = __importStar(require("@actions/exec"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const go_version = core.getInput('go_version');
            const targets = core.getInput('targets');
            const flag_ldflags = core.getInput('flag_ldflags');
            const flag_v = core.getInput('flag_v');
            const flag_x = core.getInput('flag_x');
            console.log('🐳 Check Docker version');
            yield exec.exec('docker', ['version']);
            console.log(`⬇️ Pulling crazymax/xgo:${go_version}...`);
            yield exec.exec('docker', ['pull', `crazymax/xgo:${go_version}`]);
            console.log('🏃 Building project...');
            yield exec.exec('docker', [
                'run',
                '--rm',
                '-i',
                '-v',
                `${process.env['GITHUB_WORKSPACE']}:/source`,
                '-v',
                `${process.env['GITHUB_WORKSPACE']}/build:/build`,
                '-e',
                `TARGETS=${targets}`,
                '-e',
                `FLAG_LDFLAGS=${flag_ldflags}`,
                '-e',
                `FLAG_V=${flag_v}`,
                '-e',
                `FLAG_X=${flag_x}`,
                `crazymax/xgo:${go_version}`
            ]);
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
