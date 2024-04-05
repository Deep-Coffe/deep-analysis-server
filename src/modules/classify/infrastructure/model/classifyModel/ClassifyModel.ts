import IClassifyModel from "./IClassifyModel";
import { spawn } from 'child_process'
import { serverConfig } from "@config/env/ServerConfig";
import Logger from "@application/config/LoggerConfig";
import BadRequestError from "@application/error/BadRequestError";
import { ClassifyImageOutputDTO } from "@modules/classify/domain/service/classifyImageService/ClassifyImageServiceDTO";

class ClassifyModel implements IClassifyModel {
    public async run(fileName: string): Promise<ClassifyImageOutputDTO> {
        return new Promise((resolve, reject) => {
            Logger.info('Running classification model');
            const model_script = spawn('python3', [serverConfig.modelRelativePath, fileName]);

            Logger.info('Collect data from classification model...');

            let result = ''
            model_script.stdout.on('data', (data) => {
                result += data.toString();
            });

            model_script.stdout.on('end', () => {
                try {
                    const jsonResult = JSON.parse(result);
                    Logger.info('Classification result: ' + result)
                    Logger.info('Collect data with success');
                    Logger.info('Classification model run with success');
                    resolve(jsonResult);
                } catch (error) {
                    Logger.warn('Classification fail');
                    Logger.error(error as Error);
                    reject(new BadRequestError('A analise falhou, tente novamente!'));
                }
            });
        })
    }
}

export default ClassifyModel;