export const logger = {
  info: (msg, meta = '') => {
    console.log(`[SACHAI INFO] ${new Date().toISOString()} - ${msg}`, meta);
  },
  warn: (msg, meta = '') => {
    console.warn(`[SACHAI WARN] ${new Date().toISOString()} - ${msg}`, meta);
  },
  error: (msg, meta = '') => {
    console.error(`[SACHAI ERROR] ${new Date().toISOString()} - ${msg}`, meta);
  }
};
