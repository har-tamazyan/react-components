import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  border: 1px solid ${(p) => p.theme.ALTO};
  border-radius: 4px;
`;

export const EditorContainer = styled.div`
  .ck-editor__main {
    min-height: 200px;
    > div {
      min-height: 200px;
      padding: 0 10px;
      color: ${(p) => (p.placeholderTheme ? p.theme.SILVER : p.theme.WATERLOO)};
      font-size: ${(p) => p.theme.MEDIUM};
    }
  }
  .ck-rounded-corners  {
    border: none;
  }
  .ck.ck-editor__top .ck-sticky-panel .ck-toolbar {
    border: none;
    border-bottom: 1px solid ${(p) => p.theme.ALTO};
  }
  .ck.ck-editor__editable:not(.ck-editor__nested-editable).ck-focused {
    border: none;
    box-shadow: none;
  }
  ul {
    list-style-position: outside;
    padding-left: 30px;
  }
  .ck-content.ck-editor__editable {
    background-color: ${(p) => p.theme.WHITE_LILAC};
  }
  .ck.ck-content ul li {
    list-style-type: inherit;
  }
  ol {
    list-style-position: outside;
    padding-left: 30px;
  }
  .ck.ck-content ol li {
    list-style-type: decimal;
  }
`;

export const ReadOnlyText = styled.div`
  background-color: ${(p) => p.theme.ALTO};
  color: ${(p) => p.theme.WATERLOO};
  font-size: ${(p) => p.theme.MEDIUM};
  padding: 10px;
  border-radius: 4px;
  ol {
    list-style-position: outside;
    padding-left: 30px;
  }
  ul {
    list-style-position: outside;
    padding-left: 30px;
  }
`;

export const RequiredDot = styled.div`
  position: absolute;
  top: 52px;
  right: 12px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${(p) => p.theme.BRICK_RED};
`;

export const EditorInputForRequired = styled.input`
  pointer-events: none;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0;
  opacity: 0;
`;
