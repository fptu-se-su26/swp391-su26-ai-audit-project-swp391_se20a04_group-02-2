import { Router, Request, Response, NextFunction } from 'express';
import { protect } from '../middlewares/auth.middleware';
import { AuthRequest } from '../types';
import * as fs from 'fs';
import * as path from 'path';

const router = Router();

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../../uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Health check endpoint (no auth required)
router.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Upload service is running',
    uploadsDir,
  });
});

// Middleware to check authentication with detailed logging
const uploadProtect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(
      '[Upload Auth] Authorization header:',
      req.headers.authorization ? 'Present' : 'Missing'
    );
    console.log('[Upload Auth] Request path:', req.path);
    console.log('[Upload Auth] Request method:', req.method);

    await protect(req, res, next);
  } catch (err) {
    console.error('[Upload Auth Error]', err);

    res.status(500).json({
      success: false,
      message: 'Authentication middleware error',
      error:
        process.env.NODE_ENV === 'development'
          ? err instanceof Error
            ? err.message
            : String(err)
          : undefined,
    });
  }
};

router.use(uploadProtect);

// POST /upload — handle file upload via base64 and save locally
router.post('/', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    console.log('[Upload] Request received');
    console.log('[Upload] User:', req.user?.id);
    console.log('[Upload] Body keys:', Object.keys(req.body));

    const { fileName, fileData, fileType } = req.body;

    if (!fileName || !fileData) {
      console.log(
        '[Upload] Validation failed: missing fileName or fileData'
      );

      res.status(400).json({
        success: false,
        message: 'fileName và fileData là bắt buộc',
      });

      return;
    }

    console.log(
      '[Upload] Uploading file:',
      fileName,
      'Type:',
      fileType,
      'DataSize:',
      fileData.length
    );

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'application/pdf',
    ];

    if (fileType && !allowedTypes.includes(fileType)) {
      res.status(400).json({
        success: false,
        message: `Loại file không được hỗ trợ. Cho phép: ${allowedTypes.join(
          ', '
        )}`,
      });

      return;
    }

    const buffer = Buffer.from(fileData, 'base64');

    const maxSize = 5 * 1024 * 1024;

    if (buffer.length > maxSize) {
      res.status(400).json({
        success: false,
        message: `File quá lớn (${(
          buffer.length /
          1024 /
          1024
        ).toFixed(2)}MB / 5MB tối đa)`,
      });

      return;
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const ext = path.extname(fileName) || '.jpg';

    const uniqueFileName = `${timestamp}_${randomStr}${ext}`;
    const filePath = path.join(uploadsDir, uniqueFileName);

    // Save file
    fs.writeFileSync(filePath, buffer);

    console.log(
      '[Upload] File saved successfully:',
      uniqueFileName,
      'Size:',
      buffer.length
    );

    res.status(201).json({
      success: true,
      data: {
        url: `/uploads/${uniqueFileName}`,
        originalName: fileName,
        size: buffer.length,
      },
    });
  } catch (err) {
    console.error('[Upload Error]', err);

    res.status(500).json({
      success: false,
      message: 'Upload failed',
      error:
        process.env.NODE_ENV === 'development'
          ? err instanceof Error
            ? err.message
            : String(err)
          : undefined,
    });
  }
});

export default router;