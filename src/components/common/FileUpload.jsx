// src/components/common/FileUpload.jsx
// Advanced file upload component with drag-drop
// Converted to Material-UI

import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
	Box,
	Button,
	List,
	ListItem,
	ListItemText,
	IconButton,
	FormHelperText,
	Typography,
	Paper,
} from '@mui/material';
import {
	CloudUpload as CloudUploadIcon,
	Close as CloseIcon,
	InsertDriveFile as FileIcon,
} from '@mui/icons-material';

const FileUpload = ({
	name,
	label,
	onChange,
	accept = '*',
	multiple = false,
	maxSize,
	maxFiles,
	disabled = false,
	required = false,
	hint,
	error,
	dragdrop = true,
	preview = true,
	showSize = true,
	className = '',
	testId,
	onError,
	formats = [],
}) => {
	const inputRef = useRef(null);
	const [dragActive, setDragActive] = useState(false);
	const [files, setFiles] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);

	const validateFiles = (fileList) => {
		const newFiles = Array.from(fileList);
		const errors = [];

		if (maxFiles && files.length + newFiles.length > maxFiles) {
			const msg = `Maximum ${maxFiles} files allowed`;
			errors.push(msg);
			onError?.(msg);
			setErrorMessage(msg);
			return;
		}

		for (const file of newFiles) {
			if (maxSize && file.size > maxSize) {
				errors.push(`${file.name} exceeds maximum size`);
				continue;
			}

			if (formats.length > 0) {
				const ext = file.name.split('.').pop().toLowerCase();
				if (!formats.includes(ext)) {
					errors.push(`${file.name} format not allowed`);
					continue;
				}
			}

			setFiles((prev) => [
				...prev,
				{
					file,
					id: Math.random(),
					progress: 0,
					error: null,
				},
			]);
		}

		if (errors.length > 0) {
			setErrorMessage(errors[0]);
			onError?.(errors[0]);
		} else {
			setErrorMessage(null);
		}

		onChange?.(newFiles);
	};

	const handleDrag = (e) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === 'dragenter' || e.type === 'dragover') {
			setDragActive(true);
		} else if (e.type === 'dragleave') {
			setDragActive(false);
		}
	};

	const handleDrop = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);

		if (disabled) return;
		validateFiles(e.dataTransfer.files);
	};

	const handleChange = (e) => {
		if (disabled) return;
		validateFiles(e.target.files);
	};

	const handleClick = () => {
		if (!disabled) {
			inputRef.current?.click();
		}
	};

	const removeFile = (id) => {
		setFiles((prev) => prev.filter((f) => f.id !== id));
		onChange?.(files.filter((f) => f.id !== id).map((f) => f.file));
	};

	const formatFileSize = (bytes) => {
		if (bytes === 0) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return (
			Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
		);
	};

	const hasError = error || errorMessage;

	return (
		<Box className={className}>
			{label && (
				<Typography
					variant="subtitle2"
					sx={{ marginBottom: '8px', fontWeight: 600 }}
				>
					{label}
					{required && <span style={{ color: 'red' }}>*</span>}
				</Typography>
			)}

			{/* Dropzone */}
			<Paper
				onDragEnter={dragdrop ? handleDrag : undefined}
				onDragLeave={dragdrop ? handleDrag : undefined}
				onDragOver={dragdrop ? handleDrag : undefined}
				onDrop={dragdrop ? handleDrop : undefined}
				onClick={handleClick}
				sx={{
					padding: '32px 16px',
					textAlign: 'center',
					borderWidth: 2,
					borderStyle: 'dashed',
					borderColor: dragActive
						? 'primary.main'
						: hasError
						? 'error.main'
						: 'divider',
					backgroundColor: dragActive
						? 'action.hover'
						: 'background.paper',
					cursor: disabled ? 'not-allowed' : 'pointer',
					opacity: disabled ? 0.6 : 1,
					transition: 'all 0.3s ease',
					'&:hover': {
						backgroundColor: !disabled
							? 'action.hover'
							: 'background.paper',
						borderColor: !disabled ? 'primary.main' : 'divider',
					},
				}}
				role="button"
				tabIndex={disabled ? -1 : 0}
			>
				<input
					ref={inputRef}
					type="file"
					name={name}
					onChange={handleChange}
					accept={accept}
					multiple={multiple}
					disabled={disabled}
					data-testid={testId}
					style={{ display: 'none' }}
				/>

				<CloudUploadIcon
					sx={{
						fontSize: '48px',
						color: 'primary.main',
						marginBottom: '16px',
					}}
				/>
				<Typography variant="body1" gutterBottom>
					Click to upload or drag and drop
				</Typography>
				{formats.length > 0 && (
					<Typography variant="caption" color="text.secondary">
						Supported: {formats.join(', ').toUpperCase()}
					</Typography>
				)}
			</Paper>

			{/* File list */}
			{files.length > 0 && (
				<List
					sx={{
						marginTop: '16px',
						border: '1px solid',
						borderColor: 'divider',
						borderRadius: '4px',
					}}
				>
					{files.map((item) => (
						<ListItem
							key={item.id}
							secondaryAction={
								<IconButton
									edge="end"
									size="small"
									onClick={() => removeFile(item.id)}
									aria-label={`Remove ${item.file.name}`}
								>
									<CloseIcon fontSize="small" />
								</IconButton>
							}
						>
							<FileIcon sx={{ marginRight: '12px' }} />
							<ListItemText
								primary={item.file.name}
								secondary={
									showSize
										? formatFileSize(item.file.size)
										: undefined
								}
							/>
						</ListItem>
					))}
				</List>
			)}

			{/* Feedback */}
			{hint && !error && !errorMessage && (
				<FormHelperText sx={{ marginTop: '8px' }}>
					{hint}
				</FormHelperText>
			)}
			{(error || errorMessage) && (
				<FormHelperText error sx={{ marginTop: '8px' }}>
					{error || errorMessage}
				</FormHelperText>
			)}
		</Box>
	);
};

FileUpload.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	onChange: PropTypes.func,
	accept: PropTypes.string,
	multiple: PropTypes.bool,
	maxSize: PropTypes.number,
	maxFiles: PropTypes.number,
	disabled: PropTypes.bool,
	required: PropTypes.bool,
	hint: PropTypes.string,
	error: PropTypes.string,
	dragdrop: PropTypes.bool,
	preview: PropTypes.bool,
	showSize: PropTypes.bool,
	className: PropTypes.string,
	testId: PropTypes.string,
	onError: PropTypes.func,
	formats: PropTypes.arrayOf(PropTypes.string),
};

export default FileUpload;
