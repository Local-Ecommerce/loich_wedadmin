import React from 'react';
import styled from 'styled-components';
import { ToggleOff, ToggleOn } from '@mui/icons-material';
import { DateTime } from 'luxon';
import * as Constant from '../../Constant';

const TableRow = styled.tr`
    &:hover {
        background-color: #F5F5F5;
        cursor: pointer;
    }
`;

const TableData = styled.td`
    padding: 16px;
    vertical-align: top;
    border-bottom: 1px solid #dee2e6;
    vertical-align: middle;
    text-align: ${props => props.center ? "center" : "left"};
    font-size: 15px;
    color: ${props => props.grey ? props.theme.grey : null};

    height: 50px;
`;

const StyledToggleOnIcon = styled(ToggleOn)`
    && {
        font-size: 40px;
        color: ${props => props.disabled ? "rgba(0,0,0,0.1)" : props.theme.green};
        
        &:hover {
            opacity: 0.8;
        }
    }
`;

const StyledToggleOffIcon = styled(ToggleOff)`
    && {
        font-size: 40px;
        color: ${props => props.disabled ? "rgba(0,0,0,0.1)" : props.theme.red};
        
        &:hover {
            opacity: 0.8;
        }
    }
`;

const NewsItem = ({ item, handleGetDetailItem, handleGetToggleStatusItem, index }) =>  {
    const user = JSON.parse(localStorage.getItem('USER'));

    if (item === 0) {
        return (
            <tr>
                <TableData center colSpan={100} >
                    <h4>Không tìm thấy dữ liệu.</h4>
                </TableData>
            </tr>
        )
    }

    let disableEdit = false;
    if (user.Residents[0] && user.RoleId === "R001" && user.Residents[0].Type === Constant.MARKET_MANAGER) {
        if (!item.ResidentId) {
            disableEdit = true;
        }
    }

    const handleSetDetailItem = (e) => {
        e.stopPropagation();
        handleGetDetailItem(item.NewsId);
    }

    const handleApproveItem = (e) => {
        e.stopPropagation();
        if (!disableEdit) {
            handleGetToggleStatusItem(item.NewsId, item.Title, true);
        }
    }

    const handleRejectItem = (e) => {
        e.stopPropagation();
        if (!disableEdit) {
            handleGetToggleStatusItem(item.NewsId, item.Title, false);
        }
    }

    return (
        <TableRow onClick={handleSetDetailItem}>
            <TableData grey>{index + 1}</TableData>
            <TableData>{item.Title}</TableData>
            <TableData>{item.Text}</TableData>
            { 
                user.Residents[0] && user.RoleId === "R001" && user.Residents[0].Type === "MarketManager" ? 
                null : 
                <TableData center>{item.Apartment ? item.Apartment.ApartmentName : "Hệ thống"}</TableData>
            }
            <TableData center>{item.Resident ? item.Resident.ResidentName : "Admin"}</TableData>

            <TableData center>
                <small>
                    {DateTime.fromISO(item.ReleaseDate).toFormat('dd/MM/yyyy')}<br/>
                    {DateTime.fromISO(item.ReleaseDate).toFormat('t')}
                </small>
            </TableData>

            <TableData center>
                {
                    item.Status === Constant.ACTIVE_NEWS ?
                    <StyledToggleOnIcon disabled={disableEdit} onClick={handleApproveItem} />
                    : item.Status === Constant.INACTIVE_NEWS ?
                    <StyledToggleOffIcon disabled={disableEdit} onClick={handleRejectItem} />
                    : null
                }
            </TableData>
        </TableRow>
    )
}

export default NewsItem;