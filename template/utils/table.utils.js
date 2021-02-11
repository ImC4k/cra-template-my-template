import { omit, startCase, startsWith } from 'lodash';

const getKeyColumn = (key) => ({
    title: '',
    dataIndex: key,
    width: '5%',
    editable: false
});

const dateSorter = (date1Obj, date2Obj) => {
    if (typeof date1Obj.date === 'string' && typeof date2Obj.date === 'string') {
        // assuming the dateObj.date is in format DD/MM/YYYY, transform to YYYYMMDD and perform locale comparison
        const date1 = date1Obj.date.split('/').reverse().map(num => num.length === 1? `0${num}` : num).join('');
        const date2 = date2Obj.date.split('/').reverse().map(num => num.length === 1? `0${num}` : num).join('');
        return date1.localeCompare(date2);
    }
    return 0;
};

export const getDataAndColumns = (data, titles) => {
    const augmentedData = augmentTableData(data);
    return [
        augmentedData,
        getDataColumns(augmentedData, titles)
    ];
}

export const augmentTableData = (data) => {
    if (data) {
        return data.map((item, index) => {
            const omittedIdData = omit(item, 'id');
            return { key: index + 1, ...omittedIdData }
        });
    }
    return [];
};

export const getDataColumns = ((data, titles) => {
    if (data.length <= 0) {
        const noKeyDataColumns = Object.keys(titles).filter(columnName => !startsWith(columnName, '__')).map(columnName => {
            if (isDateColumn(columnName)) {
                return ({
                    title: startCase(titles[columnName]) || columnName,
                    dataIndex: columnName,
                    editable: true,
                    isDate: true,
                    sorter: dateSorter,
                    sortDirections: ['descend', 'ascend'],
                    ellipsis: true,
                    width: '15em',
                });
            }
            else {
                return ({
                    title: startCase(titles[columnName]) || columnName,
                    dataIndex: columnName,
                    editable: true,
                    // width: '5em',
                });
            }
        });
        return [getKeyColumn('key'), ...noKeyDataColumns];
    }
    else {
        return Object.keys(data[0]).map(columnName => {
            if (columnName === 'key') {
                return getKeyColumn('key');
            }
            else if (isDateColumn(columnName)) {
                return ({
                    title: startCase(titles[columnName]) || columnName,
                    dataIndex: columnName,
                    editable: true,
                    isDate: true,
                    sorter: dateSorter,
                    sortDirections: ['descend', 'ascend'],
                    ellipsis: true,
                    width: '15em',
                });
            }
            else {
                return ({
                    title: startCase(titles[columnName]) || columnName,
                    dataIndex: columnName,
                    editable: true,
                    ellipsis: true,
                    // width: '5em',
                });
            }
        });
    }
});

export const isDateColumn = (dataColumnName) => {
    return ['date', 'birthday'].includes(dataColumnName);
}