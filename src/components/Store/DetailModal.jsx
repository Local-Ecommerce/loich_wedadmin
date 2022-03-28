/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Modal from 'react-modal';
import { api } from "../../RequestMethod";
import { HideImage } from '@mui/icons-material';
import * as Constant from '../../Constant';

import MenuInStoreList from '../Menu/MenuInStoreList';

const ModalContentWrapper = styled.div`
    border-bottom: 1px solid #cfd2d4;
    padding: 20px;
    display: flex;
    justify-content: center;
`;

const LeftWrapper = styled.div`
    flex: 1;
    padding: 20px 20px 20px 0px;
    border-right: 1px solid rgba(0,0,0,0.1);
`;

const RightWrapper = styled.div`
    flex: 2;
    padding: 20px;
    max-height: 50vh;
    overflow: auto;
    overflow-x: hidden;
`;

const FieldLabel = styled.div`
    font-weight: 400;
    font-size: 14px;
    margin-top: ${props => props.mt ? "10px" : "0px"};
    margin-bottom: 5px;
    color: ${props => props.theme.dark};
`;

const TextField = styled.input`
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 5px;
    padding: 10px;
    outline: none;
    border: 1px solid ${props => props.error ? props.theme.red : props.theme.greyBorder};
    border-radius: 3px;
    font-size: 14px;

    &:disabled {
        color: ${props => props.theme.black};
    }
`;

const ModalButtonWrapper = styled.div`
    margin: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ModalButton = styled.button`
    padding: 8px 10px;
    margin-left: 10px;
    background: ${props => props.red ? props.theme.red : props.blue ? props.theme.blue : props.theme.white};
    color: ${props => props.red || props.blue ? props.theme.white : props.theme.grey};
    border: 1px solid ${props => props.red ? props.theme.red : props.blue ? props.theme.blue : props.theme.greyBorder};
    border-radius: 6px;
    text-align: center;
    font-size: 14px;
    display: inline-flex;
    align-items: center;

    &:hover {
    opacity: 0.8;
    }

    &:focus {
    outline: 0;
    }

    &:active {
    transform: translateY(1px);
    }
`;

const StyledNoImageIcon = styled(HideImage)`
    && {
        color: rgba(0,0,0,0.2);
        font-size: 40px;
        padding: 40px;
        border-radius: 3px;
        border: 1px solid rgba(0,0,0,0.2);
    }
`;

const Image = styled.img`
    object-fit: contain;
    width: 120px;
    height: 120px;
    border-radius: 3px;
    border: 1px solid rgba(0,0,0,0.2);
`;

const Label = styled.div`
    font-size: 16px;
    color: #383838;
    font-weight: 600;
    margin-bottom: 10px;
`;

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: '40%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '0px',
    },
};

const DetailModal = ({ display, toggle, detailItem }) => {
    const [resident, setResident] = useState({});
    const [menus, setMenus] = useState([]);
    const [store, setStore] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (display) {
            setLoading(true);
            const fetchData = async () => {
                api.get("stores?id=" + detailItem.id)
                .then(function (res) {
                    if (res.data.ResultMessage === "SUCCESS") {
                        setStore(res.data.Data.List[0])

                        let url = "menus"
                        + "?sort=-createddate"
                        + "&include=product"
                        + "&status=" + Constant.ACTIVE_MENU;
                        api.get(url)
                        .then(function (res2) {
                            if (res2.data.ResultMessage === "SUCCESS") {
                                setMenus(res2.data.Data.List);

                                api.get("residents?id=" + res.data.Data.List[0].ResidentId)
                                .then(function (res3) {
                                    if (res3.data.ResultMessage === 'SUCCESS') {
                                        setResident(res3.data.Data.List[0]);
                                        setLoading(false);
                                    }
                                })
                            }
                        })
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    setLoading(false);
                });
            };
            fetchData();
        }
    }, [display]);

    return (
        <Modal isOpen={display} onRequestClose={toggle} style={customStyles} ariaHideApp={false}>

            <ModalContentWrapper>
                <LeftWrapper>
                    <Label>Cửa hàng</Label>
                    {
                        store.StoreImage ?
                        <Image src={store.StoreImage ? store.StoreImage : ''} />
                        : <StyledNoImageIcon />
                    }

                    <FieldLabel mt>Tên cửa hàng</FieldLabel>
                    <TextField
                        disabled={true}
                        type="text" value={store.StoreName}
                    />

                    <FieldLabel mt>Quản lí</FieldLabel>
                    <TextField
                        disabled={true}
                        type="text" value={resident.ResidentName}
                    />

                    <FieldLabel mt>Địa chỉ</FieldLabel>
                    <TextField
                        disabled={true}
                        type="text" value={resident.DeliveryAddress}
                    />
                </LeftWrapper>

                <RightWrapper>
                    <Label>Bảng giá</Label>

                    {loading ? null : <MenuInStoreList currentItems={menus} />}
                </RightWrapper>
            </ModalContentWrapper>

            <ModalButtonWrapper>
                <small>{menus.length} bảng giá thuộc {store.StoreName}</small>
                <ModalButton onClick={toggle}>Quay lại</ModalButton>
            </ModalButtonWrapper>
        </Modal>
    )
};

export default DetailModal;