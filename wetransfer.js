const axios = require('axios');
const fs = require('fs');
const path = require('path');

const createWTClient = require('@wetransfer/js-sdk');

if(process.argv.length<4) process.exit(1)

const filePaths = [ ];

process.argv.forEach((val, index) => {
  if(index > 2) filePaths.push(path.join(process.cwd(),val))
});

function readFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (error, data) => {
      if (error) {
        return reject(error);
      }

      resolve(data);
    });
  });
}

/**
 * Create a transfer with beautiful pictures of Japan.
 */
(async function createTransfer() {
  try {
    // Initialize the client
    const wtClient = await createWTClient(process.env.WT_API_KEY, {
      logger: {
        level: 'silly',
      },
    });

    // Read the content of the files in parallel
    const fileContents = await Promise.all(filePaths.map(readFile));

    // Create the files array with names, sizes and content.
    const files = filePaths.map((file, index) => {
      const content = fileContents[index];
      return {
        name: file.split('/').pop(),
        size: content.length,
        content: content,
      };
    });

    const transfer = await wtClient.transfer.create({
      message: process.argv[2],
      files: files,
    });

    const remoteTransfer = await wtClient.transfer.find(transfer.id);

    console.log(transfer.url);
    console.log(remoteTransfer.url);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
