/**
 * @jest-environment node
 */
import appPath from 'app-root-path';
import path from 'path';

import { getPackageData, readFile, getVersion, addMajorVersion, addMinorVersion, writeFile } from '../index';
// let originalPackageData: string;



test('getPackageData() is correct', async () => {

  let originalPackageData = await getPackageData();

  expect(originalPackageData).toBeDefined();
  expect(originalPackageData).toHaveProperty('version');
})

test('reading "/src/index.ts" is correct', async () => {
  expect.assertions(1);

  let fileData: any;
  try {
    fileData = await readFile(path.join(appPath.path, '/src/index.ts'));

    expect(fileData).toBeDefined();
  } catch (e) {
    console.log('error', e);
  }
})

test('reading "/fail/src/index.ts" throws', async () => {
  expect.assertions(1);

  await expect(readFile('/fail/src/index.ts')).rejects.toThrow();
})

test('getVersion is defined', async () => {

  const ver = <string>await getVersion();
  expect(ver).toBeDefined();
})

test('set minor + major version', async () => {
  expect.assertions(1);

  try {
    await addMinorVersion();
    await addMajorVersion();

    expect(1).toEqual(1);
  } catch (e) {
    console.log(e);
  }
})

test('writeFile relative root path is correct', async () => {
  expect.assertions(1);

  try {
    const jestFile = '__jest_rel.json';
    const res = await writeFile(jestFile, { jest: 'test' });

    expect(1).toEqual(1);
  } catch (e) {
    console.log(e);
  }
})

test('writeFile absolute root path is correct', async () => {
  expect.assertions(1);

  try {
    const jestFile = path.join(appPath.path,'__jest_abs.json');
    const res = await writeFile(jestFile, { jest: 'test' });

    expect(1).toEqual(1);
  } catch (e) {
    console.log(e);
  }
})

test('writeFile to bad path throws', async () => {
  expect.assertions(0);

  try {
    const jestFile = 'C:\\C:\\__jest.json'
    const res = await writeFile(jestFile, { jest: 'test' });

    expect(1).toEqual(1);
  } catch (e) {
    console.log(e);
  }
})