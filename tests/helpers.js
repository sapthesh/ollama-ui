import { exec } from 'node:child_process';

export function openScreenshot(filePath) {
  const openCommand =
    process.platform === 'win32'
      ? 'start'
      : process.platform === 'darwin'
        ? 'open'
        : 'xdg-open';
  exec(`${openCommand} ${filePath}`, (error) => {
    if (error) {
      console.error(`  ✔ Error opening screenshot: ${error}`);
    }
  });
}

export const url = 'http://localhost:11434';
export const model = 'dolphin-phi:latest';
