import axiosInstance from '../axiosConfig';
import axios from 'axios';
import { validateHelper } from '@/helpers/validateHelper';

const presignedURLService = async (file, folder) => {
	try {
		// Create FormData and append file with correct key
		const formData = new FormData();
		formData.append('file', file);
		formData.append('folder', folder);

		const res = await axiosInstance.post(
			'/storage/presigned-url',
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			},
		);
		return res.data;
	} catch (error) {
		const message = validateHelper(error);
		throw new Error(message);
	}
};

const uploadFileToS3 = async (file, presignedURL) => {
	try {
		await axios.put(presignedURL, file, {
			headers: {
				'Content-Type': file.type,
			},
		});
	} catch (error) {
		console.error(await error?.response?.data);
		throw error;
	}
};

const storageService = {
	presignedURLService,
	uploadFileToS3,
};

export default storageService;
