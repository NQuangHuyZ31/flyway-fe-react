import { useState } from 'react';

export const useFormModal = () => {
	const [formModal, setFormModal] = useState({
		open: false,
		data: null,
	});

	const open = (data = null) => {
		setFormModal({ open: true, data });
	};

	const close = () => {
		setFormModal({ open: false, data: null });
	};

	return { formModal, open, close };
};
