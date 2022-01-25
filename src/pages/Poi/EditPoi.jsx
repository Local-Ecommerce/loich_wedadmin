import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, Link } from "react-router-dom";
import { publicRequest } from "../../RequestMethod";
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { toast } from 'react-toastify';
import { DateTime } from 'luxon';

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #727272;
`;

const Title = styled.h1`
    font-size: 30px;
    color: #383838;
    margin: 15px;
`;

const ContainerWrapper = styled.div`
    display: flex;
    margin-top: 20px;
`;

const PoiDetailWrapper = styled.div`
    flex: 2;
    padding: 20px 40px;
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const PoiUpdateWrapper = styled.div`
    flex: 2;
    padding: 20px 40px;
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    margin-left: 20px;
`;

const DetailBottom = styled.div`
    margin-top: 20px;
`;

const DetailTitle = styled.span`
    font-size: 14px;
    font-weight: 600;
    color: rgb(175, 170, 170);
`;

const DetailInfo = styled.div`
    align-items: center;
    margin: 12px 10px;
    color: #444;
`;

const DetailInfoText = styled.span`
    display: block;
    margin: 10px;
`;

const DetailStatus = styled.span`
    display: inline-block;
    padding: 8px 10px;
    margin: 0px 10px;
    font-size: 0.9;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 0.25rem;
    color: ${props => props.active === "inactive" ? "grey" : "#fff"};
    background-color: ${props => props.active === "active" ? "#28a745"
    :
    props.active === "inactive" ? "#E0E0E0"
        :
        "#dc3545"};
`;

const UpdateTitle = styled.span`
    font-size: 24px;
    font-weight: 600;
    display: flex;
    align-items: center;
`;

const UpdateForm = styled.form`
    display: flex;
    flex-direction: column;
`;

const StyledTextField = styled(TextField)`
    && {    
    margin-top: 30px;
    }
`;

const StyledFormControl = styled(FormControl)`
    && {    
    margin-top: 30px;
    }
`;

const UpdateButton = styled.button`
    border-radius: 5px;
    border: none;
    padding: 15px;
    cursor: pointer;
    background-color: #17a2b8;
    color: white;
    font-weight: 600;
    width: 100%;
    margin-top: 50px;

    &:active {
    box-shadow: 0 2px #666;
    transform: translateY(2px);
    }

    &:hover {
    opacity: 0.8;
    }
`;

const EditPoi = () => {
    const { id } = useParams();
    const [item, setItem] = useState({Resident: {ResidentName: ''}, Apartment: {Address: ''}});

    const [updateTitle, setUpdateTitle] = useState('');
    const [updateText, setUpdateText] = useState('');
    const [updateStatus, setUpdateStatus] = useState(13001);

    const [success, setSuccess] = useState(false);
    let activeCheck = '';
    let activeLabel = '';

    useEffect(() => {
        const url = "poi/" + id;

        const fetchPoi = async () => {
            try {
                const res = await fetch(publicRequest(url));
                const json = await res.json();
                setItem(json.Data);
                setUpdateTitle(json.Data.Title);
                setUpdateText(json.Data.Text);
                setUpdateStatus(json.Data.Status);
            } catch (error) { }
        };
        fetchPoi();
    }, [id, success]);

    const handleEditPoi = (event) => {
        event.preventDefault();
        if (validCheck(updateTitle, updateStatus)) {
            const url = "poi/update/" + id;

            const updatePoi = async () => {
                try {
                    const res = await fetch(publicRequest(url), {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            title: updateTitle,
                            text: updateText,
                            status: updateStatus,
                            residentId: item.ResidentId,
                            apartmentId: item.ApartmentId
                        })
                    });
                    const json = await res.json();
                    if (json.ResultMessage === "SUCCESS") {
                        const notify = () => toast.success("Cập nhật thành công " + item.Title + "!", {
                            position: toast.POSITION.TOP_CENTER
                        });
                        notify();
                        setSuccess(!success);
                    }
                } catch (error) { }
            };
            updatePoi();
        }
    }

    const validCheck = (title, status) => {
        if (title === null || title === '') {
            return false;
        }
        if (!(status === 13001 || status === 13002)) {
            return false;
        }
        return true;
    }

    switch (item.Status) {
        case 13001:
            activeCheck = 'active';
            activeLabel = 'Active';
            break;
        case 13002:
            activeCheck = 'inactive';
            activeLabel = 'Inactive';
            break;
        default:
            activeCheck = 'inactive';
            activeLabel = 'INVALID STATUS NUMBER';
            break;
    }

    return (
        <div>
            <Title><StyledLink to={"/pois"}>POIs</StyledLink> / {item.Title}
            </Title>

            <ContainerWrapper>
                <PoiDetailWrapper>
                    <UpdateTitle>
                        Chi tiết
                    </UpdateTitle>

                    <DetailBottom>

                        <DetailTitle>POI ID</DetailTitle>
                        <DetailInfo>
                            <DetailInfoText>{item.PoiId}</DetailInfoText>
                        </DetailInfo>

                        <DetailTitle>Tiêu đề</DetailTitle>
                        <DetailInfo>
                            <DetailInfoText>{item.Title}</DetailInfoText>
                        </DetailInfo>

                        <DetailTitle>Nội dung</DetailTitle>
                        <DetailInfo>
                            <DetailInfoText>{item.Text}</DetailInfoText>
                        </DetailInfo>

                        <DetailTitle>Ngày tạo</DetailTitle>
                        <DetailInfo>
                            <DetailInfoText>{DateTime.fromISO(item.ReleaseDate).toLocaleString(DateTime.DATETIME_SHORT)}</DetailInfoText>
                        </DetailInfo>

                        <DetailTitle>Quản lý</DetailTitle>
                        <DetailInfo>
                            <DetailInfoText>{item.ResidentId !== null ? item.Resident.ResidentName : "Admin"}</DetailInfoText>
                        </DetailInfo>

                        <DetailTitle>Chung cư</DetailTitle>
                        <DetailInfo>
                            <DetailInfoText>{item.Apartment.Address}</DetailInfoText>
                        </DetailInfo>

                        <DetailTitle>Trạng thái</DetailTitle>
                        <DetailInfo>
                            <DetailStatus active={activeCheck}>{activeLabel}</DetailStatus>
                        </DetailInfo>

                    </DetailBottom>
                </PoiDetailWrapper>


                <PoiUpdateWrapper>
                    <UpdateTitle>Chỉnh sửa</UpdateTitle>

                    <UpdateForm onSubmit={handleEditPoi}>
                        <StyledTextField
                            fullWidth 
                            value={updateTitle}
                            onChange={event => setUpdateTitle(event.target.value)}
                            error={updateTitle === ''}
                            helperText={updateTitle === '' ? 'Vui lòng nhập nội dung' : ''}
                            label="Nội dung" 
                        />

                        <StyledTextField
                            fullWidth multiline rows={4}
                            value={updateText}
                            onChange={event => setUpdateText(event.target.value)}
                            label="Tựa đề" 
                        />

                        <StyledFormControl>
                            <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel>
                            <Select 
                                value={updateStatus}
                                label="Trạng thái"
                                onChange={(event) => setUpdateStatus(event.target.value)}
                            >
                            <MenuItem value={13001}>Active</MenuItem>
                            <MenuItem value={13002}>Inactive</MenuItem>
                            </Select>
                        </StyledFormControl>

                        <UpdateButton>Cập nhật</UpdateButton>
                    </UpdateForm>
                </PoiUpdateWrapper>
            </ContainerWrapper>
        </div>
    )
}

export default EditPoi;