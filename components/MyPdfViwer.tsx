import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface Props {
  file: string; // PDFファイルのURL
}

const MyPdfViewer: React.FC<Props> = ({ file }) => {
  const [numPages, setNumPages] = React.useState(0);
  const [pageNumber, setPageNumber] = React.useState(1);

  // PDFファイルのページ数を取得する
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  // ページ番号を変更する
  const changePage = offset => {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  };

  return (
    <div>
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <div>
        Page {pageNumber} of {numPages}
      </div>
      <button onClick={() => changePage(-1)}>Previous</button>
      <button onClick={() => changePage(1)}>Next</button>
    </div>
  );
};

export default MyPdfViewer;
