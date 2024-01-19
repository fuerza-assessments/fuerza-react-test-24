const { readFileSync } = require('fs');
const { execSync } = require('child_process');

const data = readFileSync('./issues.json');
const jslist = JSON.parse(data);

for (const table of jslist) {
  const title = table.title;
  const body = table.body.replace(/(?:\r\n|\r|\n)/g, '<br>');

  let command = `gh issue create --title "${title}" --body "${body}"`;

  if (table.labels.length > 0) {
    const lbl = table.labels[0].name;
    command += ` --label "${lbl}"`;
  }

  try {
    execSync(command, { stdio: 'inherit' });
    console.log('# --- issue created successfully ---');
  } catch (error) {
    console.error('Error creating issue:', error);
  }
}
