import Quill from 'quill';
import React, { useEffect, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';
import 'react-quill/dist/quill.snow.css';
import { colors, GeyserAssetDomainUrl } from '../../../../constants';
import { fonts } from '../../../../constants/fonts';
import { useSignedUpload, useSignedUploadAPI } from '../../../../hooks';
import { testImage, useNotification } from '../../../../utils';
// @ts-ignore
import ImageUploader from 'quill-image-uploader';
import ImageEdit from 'quill-image-edit-module';

type Rules = string

interface IStyles {
	readOnly?: boolean;
}

const useStyles = createUseStyles<Rules, IStyles>({
	container: ({readOnly}: IStyles) => ({
		width: '100%',
		height: '100%',
		position: 'relative',
		display: 'flex',
		justifyContent: 'center',
		minHeight: '350px',
		'& .ql-toolbar': {
			position: 'fixed',
			display: readOnly ? 'none' : 'block',
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
			fontSize: '18px',
		},
		'& h1': {
			fontFamily: fonts.inter,
			fontSize: '22px',
			fontWeight: '500px',
		},
		'& h2': {
			fontFamily: fonts.inter,
			fontSize: '28px',
			fontWeight: '500px',
		},
		'& img': {
			borderRadius: '4px',
			display: 'block',
			margin: 'auto',
		},
		'& .image-uploading': {
			display: 'block',
		},
		'& .ql-syntax': {
			backgroundColor: `${colors.bgGrey} !important`,
			color: `${colors.textGrey} !important`,
		},
		'& .ql-video': {
			width: '100%',
			height: '100%',
			maxHeight: '500px',
		},
		'& button.ql-active': {
			color: `${colors.primary} !important`,
		},
		'& button.ql-active .ql-stroke': {
			stroke: `${colors.primary} !important`,
		},
		'& button.ql-active .ql-fill': {
			fill: `${colors.primary} !important`,
		},
	}),
});

interface IEditor {
	name: string
	value: string
	handleChange?: (name: string, content: string) => void
	readOnly?: boolean
}

export const Editor = ({name, value, handleChange, readOnly}:IEditor) => {
	const [_quillObj, _setQuillObj] = useState<Quill>();
	const quillObj = useRef(_quillObj);
	const setQuillObj = (value: Quill) => {
		quillObj.current = value;
		_setQuillObj(value);
	};

	const {toast} = useNotification();

	const classes = useStyles({readOnly});

	useEffect(() => {
		Quill.register('modules/imageUploader', ImageUploader);
		Quill.register('modules/imageEdit', ImageEdit);
		const editor = new Quill('#editor', {
			modules: {
				toolbar: {
					container: [
						['bold', 'italic', 'blockquote', 'code-block'],
						[{ header: 1 }, { header: 2 }],
						[{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
						['link', 'image', 'video'],
					],
				},
				imageUploader: {
					upload: async (file:any) => {
						try {
							const response = await useSignedUploadAPI(file);
							return response;
						} catch (error) {
							toast({
								title: 'Something went wrong',
								description: 'Image upload failed, please try again.',
								status: 'error',
							});
							return false;
						}
					},
				},
				imageEdit: {
					modules: ['Resize', 'DisplaySize'],
				},

			},
			readOnly,
			theme: 'snow',
		});

		if (value) {
			const textValue = JSON.parse(value);
			editor.updateContents(textValue, 'api');
		}

		editor.on('text-change', delta => {
			const contents = quillObj.current?.getContents();

			if (delta && delta.ops && delta.ops[2] && delta.ops[2].attributes && delta.ops[2].attributes.imageBlot) {
				return;
			}

			if (handleChange) {
				handleChange(name, JSON.stringify(contents));
			}
		});

		setQuillObj(editor);
	}, []);

	return (
		<div className={classes.container}>
			<div id="editor" >
				<div id="drag-and-drop-container"></div>
			</div>
		</div>

	);
};
