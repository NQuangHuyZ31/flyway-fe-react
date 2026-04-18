export const useActionHook = ({ addItem, updateItem, removeItem }) => {
	// Create action handler
	const createAction = async (newItem, url) => {
		const res = await url(newItem);
		addItem(res);

		return res;
	};

	const updateAction = async (id, updatedData, url) => {
		const res = await url(id, updatedData);
		updateItem(id, res);

		return res;
	};

	const deleteAction = async (id, url) => {
		await url(id);
		removeItem(id);
	};

	return {
		createAction,
		updateAction,
		deleteAction,
	};
};
