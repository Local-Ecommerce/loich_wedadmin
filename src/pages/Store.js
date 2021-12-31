﻿import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import StoreList from '../components/Store/StoreList';
import Stores from '../mockdata/Stores';
import ReactPaginate from "react-paginate";
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { Link } from "react-router-dom";

const Title = styled.h1`
    font-size: 30px;
    color: #383838;
    margin: 15px;
`;

const Row = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
`;

const ButtonWrapper = styled.div`
    display: flex;
    width: 31%;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border-color: #E0E0E0;
    border-style: solid;
    border-width: thin;
    height: 44px;
    padding: 0px 3px 0px 8px;
    background-color: #ffffff;
`;

const Input = styled.input`
    padding: 4px;
    flex-grow: 1;
    background-color: transparent;
    outline: none;
    border: none;
    margin-right: 8px;

    &:focus {
    outline: 0;
    }
`;

const Button = styled.button`
    height: 36px;
    width: 70px;
    background-color: #17a2b8;
    border-style: none;
    border-radius: 5px;
    color: #fff;

    &:focus {
    opacity: 0.5;
    }
`;

const SelectWrapper = styled.div`
    display: flex;
    width: 16%;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border-color: #E0E0E0;
    border-style: solid;
    border-width: thin;
    height: 44px;
    padding: 0px 3px 0px 8px;
    background-color: #ffffff;
    margin-right: 4%;
`;

const Select = styled.select`
    padding: 4px;
    flex-grow: 1;
    background-color: transparent;
    outline: none;
    border: none;

    &:focus {
    outline: 0;
    }
`;

const CreateButton = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #28a745;
    height: 44px;
    width: 12%;
    border-style: none;
    border-radius: 5px;
    color: #fff;
    text-decoration: none;
    font-size: 0.9em;

    &:focus {
    opacity: 0.5;
    }
`;

const AddStoreButton = styled(AddBusinessIcon)`
    padding-right: 5px;
`;

const TableWrapper = styled.div`
    width: 100%;
    margin-right: auto;
    margin-left: auto;
`;

const Table = styled.table`
    table-layout: fixed;
    border-collapse: collapse;
    width: 100%;
    max-width: 100%;
    margin-bottom: 1rem;
    background-color: #fff;
    overflow: hidden;
`;

const TableHead = styled.thead`
    display: table-header-group;
    vertical-align: bottom;
`;

const TableHeader = styled.th`
    width: ${props => props.width};
    text-align: ${props => props.center ? "center" : "left"};
    padding: 0.75rem;
    vertical-align: top;
    vertical-align: bottom;
`;

const TableBody = styled.tbody`
    border-top: 2px solid #dee2e6;
`;

const TableRow = styled.tr``;

const FloatRight = styled.div`
    margin-left: auto;
    margin-right: 3rem;
`;

const StyledPaginateContainer = styled.div`
    .pagination {
    padding: 0px;
    margin: 0px;
    color: #0366d6;
    display: flex;
    padding-left: 0;
    list-style: none;
    border-radius: 0.25rem;
    }

    .break-me {
    cursor: default;
    }

    .active {
    border-color: transparent;
    background-color: #0366d6;
    color: white;
    }

    .page-link {
    position: relative;
    display: block;
    padding: 0.5rem 0.75rem;
    margin-left: -1px;
    line-height: 1.25;
    color: #007bff;
    background-color: #fff;
    border: 1px solid #dee2e6;
    }

    .page-link:hover {
    color: #0056b3;
    text-decoration: none;
    background-color: #e9ecef;
    border-color: #dee2e6;
    }

    .page-link:focus {
    z-index: 2;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }

    .page-link:not(:disabled):not(.disabled) {
    cursor: pointer;
    }

    .page-item:first-child .page-link {
    margin-left: 0;
    border-top-left-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
    }

    .page-item:last-child .page-link {
    border-top-right-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
    }

    .page-item.active .page-link {
    z-index: 1;
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
    }

    .page-item.disabled .page-link {
    color: #6c757d;
    pointer-events: none;
    cursor: auto;
    background-color: #fff;
    border-color: #dee2e6;
    }
`;

const Store = () => {
    const [data, setData] = useState(Stores);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 5;
    const [status, setStatus] = useState(0);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(data.length / itemsPerPage));
    }, [data, itemOffset, itemsPerPage]);

    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage % data.length;
        setItemOffset(newOffset);
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    }

    const handleDeleteItem = (id) => {
        setData(data.filter((item) => item.id !== id));
    };

    return (
        <div>
            <Title>Danh sách cửa hàng</Title>

            <TableWrapper>
                <Row>
                    <ButtonWrapper>
                        <Input placeholder="Search theo mã cửa hàng" />
                        <Button>Clear</Button>
                    </ButtonWrapper>

                    <ButtonWrapper>
                        <Input placeholder="Search theo tên cửa hàng" />
                        <Button>Clear</Button>
                    </ButtonWrapper>

                    <SelectWrapper>
                        <Select value={status} onChange={handleStatusChange}>
                            <option value="0">--- Lọc theo trạng thái ---</option>
                            <option value="1">Active</option>
                            <option value="2">Deactive</option>
                        </Select>
                    </SelectWrapper>

                    <CreateButton to={"/addStore/"}>
                        <AddStoreButton />
                        Tạo cửa hàng
                    </CreateButton>
                </Row>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeader width="15%">Mã</TableHeader>
                            <TableHeader width="25%">Tên cửa hàng</TableHeader>
                            <TableHeader width="20%">Tên rút gọn</TableHeader>
                            <TableHeader width="10%" center>Mở cửa</TableHeader>
                            <TableHeader width="10%" center>Đóng cửa</TableHeader>
                            <TableHeader width="10%" center>Trạng thái</TableHeader>
                            <TableHeader width="10%" center>Chỉnh sửa</TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <StoreList currentItems={currentItems} handleDeleteItem={handleDeleteItem} />
                    </TableBody>
                </Table>

                <Row>
                    <FloatRight>
                        <StyledPaginateContainer>
                            <ReactPaginate
                                nextLabel="Next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={2}
                                pageCount={pageCount}
                                previousLabel="< Prev"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                renderOnZeroPageCount={null}
                            />
                        </StyledPaginateContainer>
                    </FloatRight>
                </Row>
            </TableWrapper>
        </div>
    )
}

export default Store;