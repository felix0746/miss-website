const {onObjectFinalized} = require("firebase-functions/v2/storage");
const {initializeApp} = require("firebase-admin/app");
const {getStorage} = require("firebase-admin/storage");
const logger = require("firebase-functions/logger");
const sharp = require("sharp");
const path = require("path");

initializeApp();

const THUMB_MAX_WIDTH = 800;
const THUMB_PREFIX = "thumb_";

exports.generateThumbnails = onObjectFinalized(
    {
      region: "us-east1",
      memory: "1GiB",
      timeoutSeconds: 60,
    },
    async (event) => {
      const fileBucket = event.data.bucket;
      const filePath = event.data.name;
      const contentType = event.data.contentType;

      const fileDir = path.dirname(filePath);
      const fileName = path.basename(filePath);

      if (!contentType || !contentType.startsWith("image/")) {
        logger.log("This is not an image.");
        return null;
      }

      if (fileName.startsWith(THUMB_PREFIX)) {
        logger.log("Already a Thumbnail.");
        return null;
      }

      const bucket = getStorage().bucket(fileBucket);
      const tempFilePath = path.join("/tmp", fileName);
      const thumbFileName = `${THUMB_PREFIX}${fileName}`;
      const thumbFilePath = path.join(fileDir, thumbFileName);
      const tempThumbPath = path.join("/tmp", thumbFileName);

      await bucket.file(filePath).download({destination: tempFilePath});
      logger.log("Image downloaded locally to", tempFilePath);

      await sharp(tempFilePath)
          .resize({width: THUMB_MAX_WIDTH, withoutEnlargement: true})
          .toFile(tempThumbPath);
      logger.log("Thumbnail created at", tempThumbPath);

      const metadata = {contentType: contentType};
      await bucket.upload(tempThumbPath, {
        destination: thumbFilePath,
        metadata: metadata,
      });
      logger.log("Thumbnail uploaded to Storage at", thumbFilePath);

      const fs = require("fs").promises;
      await fs.unlink(tempFilePath);
      await fs.unlink(tempThumbPath);

      return null;
    },
);
