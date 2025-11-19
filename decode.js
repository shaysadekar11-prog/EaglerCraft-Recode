const fs = require('fs');

function decodeLargeBase64(inputFile, outputFile) {
    console.time('Decoding time');
    
    const base64String = fs.readFileSync(inputFile, 'utf8').replace(/\s/g, '');
    const buffer = Buffer.from(base64String, 'base64');
    
    fs.writeFileSync(outputFile, buffer.toString('utf8'));
    
    console.timeEnd('Decoding time');
    console.log(`Decoded ${buffer.length} bytes to ${outputFile}`);
}


decodeLargeBase64('base64.txt', 'decoded_client.txt');