import styled, { css } from 'styled-components';
import {
  FADE_ANIMATION_IN,
  FLEX,
  TRUNCATE_TEXT,
} from 'src/web/ats/components/common/styles';

export const BulkContainer = styled.div`
  position: relative;
`;

export const BulkButton = styled.input`
  padding: 0 16px;
  border: 1px solid ${(p) => p.theme.ALTO};
  height: 40px;
  border-radius: 8px;
  letter-spacing: 0.0125rem;
  color: ${(p) => p.theme.SHARK};
  font-size: ${(p) => p.theme.SMALL};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  background-color: ${(p) => p.theme.WHITE_LILAC};
  cursor: pointer;
  ${(p) => p.disabled && css`
    cursor: not-allowed;
  `}
`;

export const BulkBox = styled.div`
  z-index: var(--dropdown-z-index);
  position: absolute;
  top: 48px;
  right: 0;
  padding: 10px 16px;
  width: 340px;
  height: 224px;
  background-color: ${(p) => p.theme.WHITE};
  box-shadow: 0px 6px 10px ${(p) => p.theme.BLACK_RGB_16};
  border-radius: 9px;
  border: 1px solid ${(p) => p.theme.WHISPER};
  will-change: opacity;

  ${(p) => p.isActive && FADE_ANIMATION_IN};
`;

export const BulkTitle = styled.div`
  ${FLEX('center', 'space-between')};
  margin-bottom: 16px;

  > div {
    font-size: ${(p) => p.theme.XX_LARGE};
    font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
    color: ${(p) => p.theme.SHARK};
  }

  > span {
    display: inline-block;
    font-size: ${(p) => p.theme.SUB_HEADING};
    color: ${(p) => p.theme.SHARK};
    cursor: pointer;
  }
`;

export const BulkDownloadUploadWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: minmax(96px, auto);
  grid-gap: 18px;
`;

export const BulkDownload = styled.div`
  background-color: ${(p) => p.theme.WHITE_LILAC};
  box-shadow: 0 0 0 0.4px ${(p) => p.theme.DUSTY_GRAY};
  border-radius: 6px;
  padding: 16px 14px 12px;
  text-align: center;
  cursor: pointer;
  text-decoration: none;
  color: ${(p) => p.theme.SHARK};

  > img {
    height: 34px;
    margin-bottom: 8px;
  }

  > div {
    font-size: ${(p) => p.theme.SMALL};
    font-weight: ${(p) => p.theme.REGULAR_FONT};

    > span {
      font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
    }
  }
`;

export const BulkUpload = styled(BulkDownload)`
  position: relative;

  > span {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    opacity: 0;
    display: block;

    > div {
      height: 100%;

      > input {
        padding: 0;
        height: 100%;
        
        &[type=file],
        &[type=file]::-webkit-file-upload-button {
          cursor: pointer;
        }
      }
    }
  }

  > div > span {
    text-decoration: underline;
  }

  ${(p) => p.isLoading && css`
    ${FLEX('center', 'center')};
  `}
`;

export const BulkSubmitContainer = styled.div`
  margin-top: 18px;
  ${FLEX('center', 'space-between')};
`;

export const BulkFileName = styled.div`
  font-size: ${(p) => p.theme.SMALL};
  font-weight: ${(p) => p.theme.REGULAR_FONT};
  display: inline-flex;
  align-items: center;
  max-width: 200px;
  border-radius: 4px;

  ${(p) => p.isFileObject && css`
    padding: 7px;
    background-color: ${p.theme.WHITE_LILAC};
    box-shadow: 0 0 0 0.4px ${p.theme.DUSTY_GRAY};
  `};

  > div {
    min-width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: ${(p) => p.theme.SUCCESS};
    ${FLEX('center', 'center')};
    display: inline-flex;
    margin-right: 4px;

    > img {
      width: 8px;
      filter: brightness(10);
    }
  }

  > span {
    ${TRUNCATE_TEXT()};
  }

  > img {
    width: 16px;
    border-radius: 2px;
    cursor: pointer;
  }
`;

export const BulkSubmitButton = styled.button`
  margin-left: 12px;
  font-size: ${(p) => p.theme.SMALL};
  font-weight: ${(p) => p.theme.BOLD_FONT};
  background-color: ${(p) => p.theme.PORT_GORE};
  color: ${(p) => p.theme.WHITE};
  min-width: 92px;
  height: 32px;
  border-radius: 6px;
  ${FLEX('center', 'center')};
  cursor: pointer;
`;
