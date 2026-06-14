import fs from 'fs';
import path from 'path';

function printTree(dir, prefix = '') {
    const items = fs.readdirSync(dir).filter(i => i !== 'node_modules' && i !== '.git');
    items.forEach((item, index) => {
        const isLast = index === items.length - 1;
        const pointer = isLast ? '└── ' : '├── ';
        console.log(prefix + pointer + item);
        const fullPath = path.join(dir, item);
        if (fs.statSync(fullPath).isDirectory()) {
            printTree(fullPath, prefix + (isLast ? '    ' : '│   '));
        }
    });
}
console.log('Shorelume');
printTree('.');
