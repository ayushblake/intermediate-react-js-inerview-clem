import React, { useEffect, useState } from "react";
import axios from 'axios';

function Table() {

    const [data, setData] = useState([]);
    const [newData, setNewData] = useState([]);
    const [input, setInput] = useState('');

    let tempArr = [];


    const flatenObject = (record) => {
        let tempObject = {}
        const locationObject = record.location
        Object.keys(locationObject).forEach(key => {
            if (typeof locationObject[key] === "object") {
                const nestedObject = locationObject[key]
                Object.keys(nestedObject).forEach(key2 => {
                    tempObject[key2] = nestedObject[key2]
                })
            }
            else {
                tempObject[key] = locationObject[key]
            }
        })
        // console.log(tempObject)
        tempArr.push(tempObject)
        setNewData(tempArr)
        // console.log(tempSetNewData)
        // setNewData(tempSetNewData);
    }

    const searchTable = (val) => {
        let tempArr2 = [];
        newData.forEach(obj => {
            Object.values(obj).forEach(fieldName => {
                if (String(fieldName).toLowerCase().includes(val.toLowerCase())) {
                    tempArr2.push(obj)
                }
            })
        })
        return tempArr2
    }

    const onClickListener = () => {
        const searchedArray = searchTable(input)
        setNewData(searchedArray)
    }

    useEffect(() => {
        axios.get("https://randomuser.me/api/?results=20")
            .then(response => {
                setData(response.data.results);
            })
    }, [])

    useEffect(() => {
        if (data != null) {
            data.forEach(record => flatenObject(record))
        }
        // console.log(tempArr)
        // setNewData(tempArr)
    }, [data])

    // useEffect(() => {
    //     const searchedArray = searchTable(input)
    //     setNewData(searchedArray)
    // }, [input])


    return (
        <div className="Table">
            <table>
                <thead>
                    <tr>
                        {newData.length !== 0 ?
                            Object.keys(newData[0]).map(headerName => {
                                return <th>{headerName}</th>
                            })
                            : null}
                    </tr>
                </thead>

                <tbody>
                    {newData.length !== 0 ?
                        newData.map(tmpObj => {
                            return (<tr>
                                {Object.values(tmpObj).map(tmpRow => {
                                    return <td>{tmpRow}</td>
                                })}
                            </tr>)
                        })
                        : null}
                </tbody>
            </table>
            <br />
            <input onChange={(event) => setInput(event.target.value)} />
            <button onClick={onClickListener}>Search</button>
        </div>
    );

}

export default Table;
