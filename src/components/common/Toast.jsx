import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const Toast = ({ message, type = 'error', duration = 3000 }) => {
	useEffect(() => {
		if (message) {
			toast[type](message, {
				autoClose: duration,
			});
		}
	}, [message, type, duration]);

	return <ToastContainer />;
};

export default Toast;
