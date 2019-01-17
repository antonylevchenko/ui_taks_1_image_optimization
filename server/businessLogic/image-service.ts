
const path = require('path');
const appPath = path.join(__dirname, '../../');
const imagesFolderPath =  appPath  + 'data/images/';
console.log(imagesFolderPath);
const minifiedImagesPath = imagesFolderPath + 'minified/';
const normalImagesPath = imagesFolderPath + 'normal/';
const tempPath = imagesFolderPath + 'temp/';
const fs = require('fs');
const im = require('imagemagick');


class ImageService {
  static getList() {
    const result = [];
    fs.readdirSync(minifiedImagesPath).forEach(file => {
      result.push(file);
    });
    return result;
  }

  static add(fileFromRequest) {
      const fileName = fileFromRequest.name;
      const normalFilePath = normalImagesPath + fileName;
      const minifiedFilePath = minifiedImagesPath + fileName;
      fs.copyFileSync(fileFromRequest.path, normalFilePath);
      const options = {
        srcPath: String(normalFilePath),
        dstPath: minifiedFilePath,
        width: 200,
        strip: true
      };
      im.resize(options, function(err, stdout) {
        if (err) {throw err; }
      });
      return true;



  }

  static remove(name) {
    console.log('removing');
    console.log(name);
    fs.unlinkSync(normalImagesPath + name);
    fs.unlinkSync(minifiedImagesPath + name);
    return true;
  }

  static loadMinifiedImage(name) {
    const filePath = minifiedImagesPath + name;
    let result;
    if (fs.existsSync(filePath)) {
      result = filePath;
    } else {
      throw console.error();
    }
    return result;
  }

  static loadNormalImage(name) {
    const filePath = normalImagesPath + name;
    let result;
    if (fs.existsSync(filePath)) {
      result = filePath;
    } else {
      throw console.error();
    }
    return result;
  }
}

module.exports = ImageService;
