import Gateway from '@/services/axios';

const uploadsUrl = '1.0/open/';

const upload = (formData) => Gateway.post(
  `${uploadsUrl}uploads/dependencies/files`,
  formData,
  {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  },
);

const scan = (ciUploadId) => Gateway.post(`${uploadsUrl}finishes/dependencies/files/uploads`, { ciUploadId });

const status = (ciUploadId) => Gateway.get(
  `${uploadsUrl}ci/upload/status?ciUploadId=${ciUploadId}&extendedOutput=true`,
);

export default {
  upload,
  scan,
  status,
};
