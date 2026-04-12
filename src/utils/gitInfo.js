const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const execSyncWrapper = (command) => {
  let stdout = null;
  try {
    stdout = execSync(command).toString().trim();
  } catch (error) {
    console.error('gitInfo: ', error);
  }
  return stdout;
};

let gitCommitHash = execSyncWrapper('git rev-parse --short=7 HEAD');

const filePath = path.resolve('src', 'gitInfo.json');
const fileContents = JSON.stringify(gitCommitHash, null, null);

fs.writeFileSync(filePath, fileContents);
