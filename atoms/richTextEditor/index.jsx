/* eslint-disable react/display-name */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { sanitizeHtml } from 'src/web/utils.js';
import * as S from './styles';

const textEditorConfig = {
  toolbar: ['heading', 'bold', 'italic', 'numberedList',
    'bulletedList', 'undo', 'redo'],
};

const RichTextEditor = ({
  htmlContentString = '',
  updateValue = () => {},
  placeholder,
  required,
  readOnly,
  minChar = 0,
}) => {
  const [isEditorFocused, setIsEditorFocused] = useState(false);
  const handleChange = (_, editor) => {
    const data = editor.getData();
    if (isEditorFocused) updateValue(data);
  };

  return (
    <S.Container>
      <S.EditorContainer placeholderTheme={!htmlContentString}>
        {readOnly
          ? <S.ReadOnlyText dangerouslySetInnerHTML={{ __html: sanitizeHtml(htmlContentString) }} />
          : <CKEditor
              editor={ClassicEditor}
              data={htmlContentString}
              config={{ ...textEditorConfig, placeholder }}
              onChange={handleChange}
              onBlur={() => setIsEditorFocused(false)}
              onFocus={() => setIsEditorFocused(true)}
          />
        }
      </S.EditorContainer>
      {!readOnly && required && (
          <S.EditorInputForRequired
            type='text'
            required
            value={htmlContentString}
            pattern={`.{${minChar},}`}
            title={`Atleast ${minChar} characters needed`}
            onChange={() => {}}
          />
      )}
      {required ? <S.RequiredDot/> : null}
    </S.Container>
  );
};

RichTextEditor.propTypes = {
  updateValue: PropTypes.func,
  htmlContentString: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  minChar: PropTypes.number,
};

export default RichTextEditor;
