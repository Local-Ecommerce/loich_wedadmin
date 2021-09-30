﻿import React, { Component } from 'react';
import Product from '../components/Product';
import Products from '../mockdata/Products';
import SweetAlert from 'sweetalert-react';

class ProductList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: Products,
            showAlert: false,
            titleAlert: '',
            idALert: '',
        }
    };

    renderProduct = () => {
        if (this.state.products.length === 0) {
            return <Product product={0} />
        }

        return this.state.products.map((product) => {
            return (
                <Product
                    product={product}
                    handleShowAlert={this.handleShowAlert}
                />
            )
        });
    };

    handleDeleteProduct = () => {
        let { idAlert } = this.state;
        if (this.state.products.length > 0) {
            for (let i = 0; i < this.state.products.length; i++) {
                if (this.state.products[i].id === idAlert) {
                    this.state.products.splice(i, 1);
                    break;
                }
            }
        }
        this.setState({
            showAlert: false
        });
    };

    handleShowAlert = (product) => {
        this.setState({
            showAlert: true,
            titleAlert: product.name,
            idAlert: product.id
        });
    };

    render() {
        return (
            <div class="container-fluid bg-white rounded">
                <div class="row mb-5">
                    <div class="col-md-4 mt-4">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Search tên sản phẩm" />
                            <span className="input-group-btn">
                                <button className="btn btn-info" type="button">Clear</button>
                            </span>
                        </div>
                    </div>

                    <div class="col-md-4 mt-4">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Search theo bộ sưu tập" />
                            <span className="input-group-btn">
                                <button className="btn btn-info" type="button">Clear</button>
                            </span>
                        </div>
                    </div>

                    <div class="col-md-4 mt-4">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Search theo danh mục" />
                            <span className="input-group-btn">
                                <button className="btn btn-info" type="button">Clear</button>
                            </span>
                        </div>
                    </div>
                </div>

                <div class="panel panel-success">
                    <SweetAlert
                        show={this.state.showAlert}
                        title="Xóa sản phẩm"
                        text={this.state.titleAlert}
                        showCancelButton
                        onOutsideClick={() => this.setState({ showAlert: false })}
                        onEscapeKey={() => this.setState({ showAlert: false })}
                        onCancel={() => this.setState({ showAlert: false })}
                        onConfirm={() => this.handleDeleteProduct()}
                    />

                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th style={{ width: '10%' }}>Hình ảnh</th>
                                <th style={{ width: '25%' }}>Tên sản phẩm</th>
                                <th style={{ width: '17%' }}>Bộ sưu tập</th>
                                <th style={{ width: '17%' }}>Danh mục</th>
                                <th style={{ width: '6%' }}>Giá</th>
                                <th style={{ width: '10%' }} class="text-center">Trạng thái</th>
                                <th style={{ width: '15%' }} class="text-center">Chỉnh sửa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderProduct()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ProductList;