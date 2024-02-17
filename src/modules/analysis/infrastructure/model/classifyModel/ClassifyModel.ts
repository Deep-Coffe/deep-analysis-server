import { ClassifyImageInputDTO, ClassifyImageOutputDTO } from "@modules/analysis/domain/service/classificateImageService/ClassifyImageServiceDTO";
import IClassifyModel from "./IClassifyModel";
import { spawn } from 'child_process'

class ClassifyModel implements IClassifyModel {
    public async run(data: ClassifyImageInputDTO): Promise<ClassifyImageOutputDTO> {
        return new Promise((resolve, reject) => {
            try {
                const model_script = spawn('python3', ['src/modules/analysis/infrastructure/model/classifyModel/model.py']);

                let result = ''
                model_script.stdout.on('data', (data) => {
                    result += data.toString(); // Convertendo a saída em uma string
                });

                model_script.stdout.on('end', () => {
                    try {
                        const jsonResult = JSON.parse(result);
                        resolve(jsonResult);
                    } catch (error) {
                        reject(error);
                    }
                });

            } catch (err) {
                reject(err)
            }
        })
    }
}

export default ClassifyModel;