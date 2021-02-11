import React, { useState, useRef, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import { showErrorNotification } from '../../../utils/notification.utils';
import { isDateColumn } from '../../../utils/table.utils';

import { Table, Button, Form, Popconfirm, Input, Select } from 'antd';
import '../Table.style.scss';

export const EditableContext = React.createContext();

function EditableRow({ index, ...props }) {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

function EditableCell({
    title,
    editable,
    isDate,
    options,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef();
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };

    const save = async (e) => {
        try {
            const values = await form.validateFields();
            if (isDateColumn(dataIndex)) {
                const transformedDate = values[dataIndex].split('-').reverse().join('/'); // DD/MM/YYYY
                const updatedData = {...record};
                updatedData[dataIndex] = transformedDate;
                handleSave(updatedData);
            }
            else {
                handleSave({ ...record, ...values });
            }
            toggleEdit();
        } catch (errInfo) {
            showErrorNotification('Save failed', JSON.stringify(errInfo));
        }
    };

    const saveWithoutFormValidation = (newValue) => {
        try {
            const updatedData = {...record};
            updatedData[dataIndex] = newValue;
            handleSave(updatedData);
            toggleEdit();
        } catch (errInfo) {
            showErrorNotification('Save failed', JSON.stringify(errInfo));
        }
    }

    let childNode = children;

    if (editable) {
        childNode = options?
            <Select defaultValue={children[1] || ''} ref={inputRef} onSelect={saveWithoutFormValidation} options={options} />
        :
        editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
            >
                {
                    isDate?
                    <Input ref={inputRef} onPressEnter={save} onBlur={save} type='date'/>
                    :
                    <Input ref={inputRef} onPressEnter={save} onBlur={save} />

                }
            </Form.Item>
        ) : (
                <div
                    className="editable-cell-value-wrap"
                    style={{
                        paddingRight: 24,
                    }}
                    onClick={toggleEdit}
                >
                    {children}
                </div>
            );
    }

    return <td {...restProps}>{childNode}</td>;
};

export default function EditableTable({data: dataSource=[], dataColumns=[], onChange=()=>{}}) {
    const { deleteButton, deletePrompt, addRowButton } = useSelector(state => state.localeReducer.locale['table']);
    const { isPortrait } = useSelector(state => state.dimensionReducer);
    const columns = [
        ...dataColumns,
        {
            render: (text, record) =>
                dataSource.length >= 1 ? (
                    <Popconfirm title={deletePrompt} onConfirm={() => handleDelete(record.key)}>
                        <Button danger>{deleteButton}</Button>
                    </Popconfirm>
                ) : null,
            width: '7em'
        },
    ].map((column) => {
        if (column.editable) {
            return {
                ...column,
                onCell: (record) => ({
                    record,
                    editable: true,
                    isDate: column.isDate,
                    options: column.options,
                    dataIndex: column.dataIndex,
                    title: column.title,
                    handleSave: handleSave,
                }),
            };
        }
        else {
            return { ...column };
        }
    });
    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };

    const handleDelete = (key) => {
        const updatedDataSource = [...dataSource];
        onChange(updatedDataSource.filter((item) => item.key !== key))
    };

    const handleAdd = () => {
        const newData = {};
        dataColumns.forEach(({dataIndex, editable, isDate, options}) => {
            if (isEqual(dataIndex, 'key')) {
                newData[dataIndex] = dataSource.length + 1;
            }
            else {
                if (editable) {
                    if (isDate) {
                        const today = new Date();
                        const dd = today.getDate() < 10? `0${today.getDate()}` : today.getDate();
                        const mm = today.getMonth() + 1 < 10? `0${today.getMonth() + 1}` : today.getMonth() + 1;
                        const yyyy = today.getFullYear();
                        newData[dataIndex] = `${dd}/${mm}/${yyyy}`;
                    }
                    else if (options) {
                        newData[dataIndex] = options[0].value;
                    }
                    else {
                        newData[dataIndex] = 'new';
                    }
                }
                else {
                    newData[dataIndex] = false;
                }
            }
        });
        onChange([...dataSource, newData]);
    };
    
    const handleSave = (row) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        onChange(newData);
    };

    return (
        <div className='table'>
            <Button
                onClick={handleAdd}
                type="primary"
                style={{
                    marginBottom: 16,
                }}
                className='new-data-button'
            >
                {addRowButton}
            </Button>
            <Table
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={dataSource}
                columns={columns}
                pagination={{ pageSize: 10 }}
                scroll={isPortrait? { x: window.innerWidth * 2.5, y: window.innerHeight * 0.7 } : {y: 240}}
            />
        </div>
    );
}