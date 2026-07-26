export function validateMediaFile(allowedMimeTypes = []) {
  return (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded. Please attach a valid file.'
      });
    }

    if (allowedMimeTypes.length > 0 && !allowedMimeTypes.some(type => req.file.mimetype.startsWith(type) || req.file.mimetype === type)) {
      return res.status(400).json({
        success: false,
        error: `Unsupported file type (${req.file.mimetype}). Expected one of: ${allowedMimeTypes.join(', ')}`
      });
    }

    next();
  };
}
