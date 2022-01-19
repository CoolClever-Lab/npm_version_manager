# Version manager NPM (CoolClever)
Модуль для автоматического версионирования проектов

## Добавление локального npm
```shell
npm set registry http://gitlab:1234
```

## Установка пакета
```shell
npm i version_manager_npm
```

## Использование

```javascript
import { getPackageData, getVersion, addMinorVersion, addMajorVersion, isExist, createDir, readFile, writeFile } from 'version_manager_npm'
```

## API - работа с версиями

### getPackageData()
```javascript
const packageData = await getPackageData();
```
### getVersion()
Получить номер текущей версии

### addMinorVersion()
Увеличение +1 минорной (последней) цифры в версии

### addMajorVersion()
Увеличение +1 мажорной (средней) цифры в версии

## API - Работа с файлами через Promise

### readFile()
```javascript
const fileData = await readFile(path.join(appPath.path, '/src/index.ts'));
```

### writeFile(Путь, Данные)
- Путь (String): абсолютный или относительный
- Данные (Object): объект данных для записи
```javascript
const jestFile1 = path.join(appPath.path,'jest_abs.json');
await writeFile(jestFile1, { jest: 'test' });

const jestFile2 = '__jest_rel.json';
await writeFile(jestFile2, { jest: 'test' });
```

### isExist(Путь)
- Путь (String): абсолютный или относительный

### createDir(Путь)
- Путь (String): абсолютный или относительный