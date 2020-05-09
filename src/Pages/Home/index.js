import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';

import './home.style.scss';

import {OutTable, ExcelRenderer} from 'react-excel-renderer';

import pkg from '../../../package.json';
import html2pdf from 'html2pdf.js';


function Index(props) {

    const [cols, setCols] = useState([]);
    const [rows, setRows] = useState([]);
    const [fileName, setFileName] = useState('');
    let ref = useRef(null);

    const handleFileUpload = (e) => {
        e.preventDefault();

        let fileObj = e.target.files[0];

        let name = fileObj.name.split('.');
        setFileName(name[0]);

        if( !fileObj){
            return;
        }
        //just pass the fileObj as parameter
        ExcelRenderer(fileObj, (err, resp) => {
            if(err){
                console.log(err);
            }
            else{
                setCols(resp.cols);
                setRows(resp.rows)
            }
        });
    };

    const toPdf = () => {

        let table = document.getElementById('excel-table');

        let opt = {
            margin:       1,
            filename:     `${fileName}.pdf`,
            html2canvas:  { scale: 2 },
            jsPDF:        { unit: 'in', format: 'a1', orientation: 'landscape' },
            pagebreak: 'legacy',
        };

        html2pdf().set(opt).from(table).save();
    };

    return (
        <div id={`home-page`}>
            <header className={`text-left`}>
                <h5 className={`user-email`}>Email : {localStorage['user_email'] || ''}</h5>
            </header>
            <div className={`top-row`}>
                <label htmlFor="excel-input-file" className={`block text-left`}>Upload</label>
                <div className={`flex file-input-wrapper`}>
                    <input type="file" id={`excel-input-file`} accept={`.csv ,.excel,.xlsx`} className={`input custom-file-input`}
                           placeholder={`upload excel file`}
                           onChange={(e) => handleFileUpload(e)}/>
                           <span className={`file-custom`}>
                           <span className={`name`}>{fileName || 'Choose file..'}</span></span>
                    <button onClick={toPdf} className={`btn btn-primary`}>Generate Pdf</button>
                    <button className={`btn btn-secondary`} onClick={() => console.log('Package JSON:', pkg)}>Print Package.json</button>
                </div>
            </div>

            <div className={`horizontal-divider`}>

            </div>

            <div id={`excel-table`} className={`table`} ref={ref}>
                <OutTable data={rows}  columns={cols} tableClassName="ExcelTable2007" tableHeaderRowClass="heading" />
            </div>
        </div>
    );
}

Index.propTypes = {};
Index.defaultProps = {};

export default Index;
