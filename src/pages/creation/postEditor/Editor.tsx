import React, { useRef } from 'react';
import { createUseStyles } from 'react-jss';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { colors } from '../../../constants';
import { fonts } from '../../../constants/fonts';

const useStyles = createUseStyles({
	container: {
		width: '100%',
		height: '100%',
		position: 'relative',
		display: 'flex',
		justifyContent: 'center',
		minHeight: '350px',
		'& .ql-toolbar': {
			position: 'fixed',
			bottom: '20px',
			float: 'center',
			zIndex: 99,
			background: 'white',
			borderRadius: '4px',
			borderWidth: '0px',
			boxShadow: '0px 3px 12px rgba(0, 0, 0, 0.1)',
		},
		'& .ql-container': {
			width: '100%',
			border: 'none',
		},
		'& .ql-editor': {
			paddingBottom: '70px !important',
		},

		'& p': {
			fontFamily: fonts.inter,
		},
		'& h1': {
			fontFamily: fonts.inter,
		},
		'& h2': {
			fontFamily: fonts.inter,
		},
		'& .ql-syntax': {
			backgroundColor: `${colors.bgGrey} !important`,
			color: `${colors.textGrey} !important`,
		},
	},
});

interface IEditorProps {
	name: string
	value?: string
	handleChange: (name: string, value: string) => void
}

export const Editor = ({ name, value, handleChange }: IEditorProps) => {
	const quillObj = useRef(null);

	const classes = useStyles();

	const onChange = (content: string) => {
		console.log(typeof content);
		handleChange(name, content);
	};

	// TODO - IMage
	// const imageHandler = () => {
	// 	const input = document.createElement('input');

	// 	input.setAttribute('type', 'file');
	// 	input.setAttribute('accept', 'image/*');
	// 	input.click();

	// 	input.onchange = async () => {
	// 		if (input.files) {
	// 			const file: any = input.files[0];
	// 			const formData = new FormData();

	// 			formData.append('image', file);

	// 			const fileName = file.name;

	// 			const res = await uploadFiles(file, fileName, quillObj);
	// 		}
	// 	};
	// };

	const modules = {
		toolbar: [
			['bold', 'italic', 'blockquote', 'code-block'],
			[{ header: 1 }, { header: 2 }],
			[{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
			['link', 'image'],
		],
		handlers: {
			image: imageHandler,
		},
	};

	const formats = [
		'header',
		'bold',
		'italic',
		'underline',
		'strike',
		'blockquote',
		'code-block',
		'list',
		'bullet',
		'indent',
		'link',
		'image',
	];

	console.log('checking value', value);
	return (
		<ReactQuill
			ref={quillObj}
			className={classes.container}
			theme="snow"
			value={value}
			onChange={onChange}
			modules={modules}
			formats={formats}
		/>
	);
};
