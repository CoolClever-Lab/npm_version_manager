import fs from 'fs';
import appPath from 'app-root-path';
import path from 'path';

export { getPackageData, getVersion, addMinorVersion, addMajorVersion, isExist, createDir, readFile, writeFile };
/**
 * ФАЙЛОВЫЕ ОПЕРАЦИИ
 */


function createDir(argPath: string): Promise<boolean | Error> {
  return new Promise((resolve, reject) => {
    fs.mkdir(argPath, { recursive: true }, (err) => {
      if (err) {
        return reject(err);
      }

      console.log(`Dir: ${argPath} created`);
      resolve(true);
    });
  });
}

function isExist(path: string): Promise<boolean | Error> {
  return new Promise((resolve) => {
    fs.access(path, fs.constants.F_OK, (err) => {
      resolve(err ? false : true);
    });
  });
}

async function readFile(argPath: string): Promise<string | Error> {
  return new Promise((resolve, reject) => {
    fs.readFile(argPath, (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data.toString());
    });
  })
}

async function writeFile(argPath: string, data: Record<string, unknown>): Promise<boolean | Error> {
  const resPath: string = path.dirname(argPath);

  return new Promise((res0, rej0) => {
    isExist(resPath)
      .then(
        // обрабатываем результат isExist
        (exist) => {
          if (!exist) {
            return createDir(resPath)
              .catch(err => {
                // возвращаем ошибку в следующем catch
                return Promise.reject(err)
              })
          }
        })
      .then(() => {
        return new Promise((res1, rej1) => {
          fs.writeFile(argPath, JSON.stringify(data, null, '\t'), (err) => {
            if (err) {
              return rej1(err);
            }
            res1(true);
          })
        })
      })
      .then(() => {
        res0(true)
      }).catch(e => {
        rej0(e);
      })
  })
}

// РАБОТА С ВЕРСИЯМИ

async function getPackageData(): Promise<Record<string, unknown>|Error> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const data = await readFile(path.join(appPath.path, 'package.json'));
    return JSON.parse(<string>data) as Record<string, unknown>;
  } catch (e) {
    return e as Error
  }

}

async function getVersion(): Promise<string|Error> {
  try {
    const packageData = await readFile('package.json');
    const parsedData = JSON.parse(<string>packageData) as Record<string, unknown>;

    return <string>parsedData.version;
  } catch (e) {
    return <Error>e
  }

}

async function addMinorVersion(position = 2): Promise<void|Error> {
  try {
    const packageData = await getPackageData() as Record<string, unknown>;
    const verOld = (packageData).version as string;
    const ver = (packageData.version as string).split('.');

    ver[position] = (parseInt(ver[position]) + 1).toString();
    const verNew = ver.join('.');
    packageData.version = verNew;
    await writeFile('package.json', packageData);
    console.log(`${verOld} -> ${verNew}`);
  } catch (e) {
    return e as Error
  }
}

async function addMajorVersion(): Promise<void | Error> {
  return await addMinorVersion(1);
}
