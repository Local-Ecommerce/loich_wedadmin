import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Edit, Delete, ContentPasteSearch } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import { Link } from "react-router-dom";

const Button = styled.button`
    padding: 3px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    overflow: hidden;
    outline: none;
    color: ${props => props.disabled === true ? "#E0E0E0" : "grey"};

    &:focus {
    outline: none;
    }
`;

const TableRow = styled.tr`
    &:hover {
        background-color: #F5F5F5;
    }
`;

const TableData = styled.td`
    padding: 1rem;
    vertical-align: top;
    border-top: 1px solid #dee2e6;
    vertical-align: middle;
    text-align: ${props => props.center ? "center" : "left"};
    overflow: hidden;
    white-space: nowrap;
    font-size: 15px;
`;

const Status = styled.span`
    display: inline-block;
    padding: 4px 6px;
    font-size: 0.8em;
    font-weight: 700;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 20px;
    color: #fff;
    background-color: ${
    props => props.active === "verified" ? "#28a745"
        :
    props.active === "unverified" ? "#FF8800"
        :
    props.active === "deleted" ? "#dc3545"
        :
    "#dc3545"};
`;

const StyledSearchIcon = styled(ContentPasteSearch)`
    &:hover {
    color: #dc3545;
    }
`;

const StyledEditIcon = styled(Edit)`
    &:hover {
    color: #dc3545;
    }
`;

const StyledDeleteIcon = styled(Delete)`
    &:hover {
    color: ${props => props.disabled === true ? "#E0E0E0" : "#dc3545"};
    }
`;

const StoreItem = ({ item, handleGetDeleteItem }) => {
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        if (loading) {
            setTimeout(() => {setLoading(false);}, 3000);
        }
    }, [loading]);

    if (item === 0) {
        return (
            <tr>
                <TableData center colSpan={5} >
                    {loading ? <CircularProgress /> : <h4>Không tìm thấy dữ liệu.</h4>}
                </TableData>
            </tr>
        )
    }
    
    let activeCheck = '';
    let activeLabel = '';
    let disabledCheck = false;
    switch (item.Status) {
        case 6004:
            activeCheck = 'deleted';
            activeLabel = 'Đã xóa';
            disabledCheck = true;
            break;
        case 6005:
            activeCheck = 'verified';
            activeLabel = 'Đã xác minh';
            break;
        case 6006:
            activeCheck = 'unverified';
            activeLabel = 'Tạo mới - chưa xác minh';
            break;
        case 6007:
            activeCheck = 'unverified';
            activeLabel = 'Cập nhật - chưa xác minh';
            break;
        default:
            activeCheck = 'inactive';
            activeLabel = 'WRONG STATUS NUMBER';
            break;
    }

    return (
        <TableRow>
            <TableData>{item.StoreName}</TableData>
            <TableData>{item.ApartmentId}</TableData>
            <TableData>{item.Resident ? item.Resident.ResidentName : null}</TableData>
            <TableData center><Status active={activeCheck}>{activeLabel}</Status></TableData>

            <TableData center>
                <Link to={"/store/" + item.MerchantStoreId}>
                    <Button>
                        <StyledSearchIcon />
                    </Button>
                </Link>

                <Link to={"/editStore/" + item.MerchantStoreId}>
                    <Button>
                        <StyledEditIcon/>
                    </Button>
                </Link>

                <Button disabled={disabledCheck} onClick={() => handleGetDeleteItem(item.MerchantStoreId, item.StoreName)}>
                    <StyledDeleteIcon disabled={disabledCheck} />
                </Button>
            </TableData>
        </TableRow>
    )
}

export default StoreItem;