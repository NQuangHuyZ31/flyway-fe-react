// src/components/common/FileUpload.jsx
// Advanced file upload component with drag-drop

import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './FileUpload.css';

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

		// Check max files
		if (maxFiles && files.length + newFiles.length > maxFiles) {
			errors.push(`Maximum ${maxFiles} files allowed`);
			onError?.(`Maximum ${maxFiles} files allowed`);
			setErrorMessage(`Maximum ${maxFiles} files allowed`);
			return;
		}

		for (const file of newFiles) {
			// Check file size
			if (maxSize && file.size > maxSize) {
				errors.push(`${file.name} exceeds maximum size`);
				continue;
			}

			// Check file format
			if (formats.length > 0) {
				const ext = file.name.split('.').pop().toLowerCase();
				if (!formats.includes(ext)) {
					errors.push(`${file.name} format not allowed`);
					continue;
				}
			}

			// Add file
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

		// Trigger onChange
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

		const { files: droppedFiles } = e.dataTransfer;
		validateFiles(droppedFiles);
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

	const uploadClasses = `
		file-upload
		${dragActive ? 'file-upload-active' : ''}
		${disabled ? 'file-upload-disabled' : ''}
		${error || errorMessage ? 'file-upload-error' : ''}
		${className}
	`.trim();

	const formatFileSize = (bytes) => {
		if (bytes === 0) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return (
			Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
		);
	};

	return (
		<div className={uploadClasses}>
			{label && (
				<label className="file-upload-label">
					{label}
					{required && (
						<span className="file-upload-required">*</span>
					)}
				</label>
			)}

			{/* Dropzone */}
			<div
				className={`file-upload-zone ${
					dragActive ? 'file-upload-zone-active' : ''
				}`}
				onDragEnter={dragdrop ? handleDrag : undefined}
				onDragLeave={dragdrop ? handleDrag : undefined}
				onDragOver={dragdrop ? handleDrag : undefined}
				onDrop={dragdrop ? handleDrop : undefined}
				onClick={handleClick}
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
					className="file-upload-input"
				/>

				<div className="file-upload-content">
					<div className="file-upload-icon">📁</div>
					<p className="file-upload-text">
						Click to upload or drag and drop
					</p>
					{formats.length > 0 && (
						<p className="file-upload-formats">
							Supported: {formats.join(', ').toUpperCase()}
						</p>
					)}
				</div>
			</div>

			{/* File list */}
			{files.length > 0 && (
				<ul className="file-upload-list">
					{files.map((item) => (
						<li key={item.id} className="file-upload-item">
							<div className="file-upload-item-info">
								<span className="file-upload-item-name">
									{item.file.name}
								</span>
								{showSize && (
									<span className="file-upload-item-size">
										{formatFileSize(item.file.size)}
									</span>
								)}
							</div>
							<button
								type="button"
								className="file-upload-item-remove"
								onClick={() => removeFile(item.id)}
								aria-label={`Remove ${item.file.name}`}
							>
								✕
							</button>
						</li>
					))}
				</ul>
			)}

			{/* Feedback */}
			{hint && !error && !errorMessage && (
				<span className="file-upload-hint">{hint}</span>
			)}
			{(error || errorMessage) && (
				<span className="file-upload-error">
					{error || errorMessage}
				</span>
			)}
		</div>
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
