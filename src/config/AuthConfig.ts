import fs from 'fs'
import path from 'path'

export default {
    publicKey: () => fs.readFileSync(path.join('key/public_key.pem'), 'utf-8'),
    privateKey: () => fs.readFileSync(path.join('key/private_key.pem'), 'utf-8')
}