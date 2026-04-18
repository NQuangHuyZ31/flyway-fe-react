import axiosInstance from '../axiosConfig';
import { validateHelper } from '@/helpers/validateHelper';

const presifnedURLService = async (file, folder) => {
	try {
		const res = await axiosInstance.post('/presigned-url', {
			file,
			folder,
		});
		return res.data;
	} catch (error) {
		const message = validateHelper(error);
		throw new Error(message);
	}
};

const uploadFileToS3 = async (file, presignedURL) => {
	try {
		await axiosInstance.put(presignedURL, file, {
			headers: {
				'Content-Type': file.type,
			},
		});
	} catch (error) {
		const message = validateHelper(error);
		throw new Error(message);
	}
};

const storageService = {
	presifnedURLService,
	uploadFileToS3,
};

export default storageService;
