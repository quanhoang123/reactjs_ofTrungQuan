import React, { Component } from 'react';
import callAPI from '../CallAPI/callApi';
import LeftContent from './LeftContent';
import axios from 'axios';
class AdminProfile extends Component {
  _admin = [];
  _avatar = [];

  constructor(props) {
    super(props);
    this.state = {
      _ourShop: [],
      comments: [],
      content: '',
      userCustomer: ''

    }
  }
  _getComments = () => {
    axios({
      method: 'GET',
      url: 'https://data-json-server.herokuapp.com/api/comments',
      data: null
    }).then(res => {
      this.setState({
        comments: res.data,
      });
    }).catch(err => { });

  }
  _getCommentsTitle(commentCount) {

    if (commentCount === 0) {
      return '0';
    } else if (commentCount === 1) {
      return "1";
    } else {
      return `${commentCount}`;
    }
  }
  getOurShop = () => {
    callAPI('coffeeShop', 'GET', null).then(res => {
      this.setState({
        _ourShop: res.data,
      });
    }).catch(err => { });

  }
  getUser = () => {
    this._admin = JSON.parse(localStorage.getItem("AdminActive"));
    return this._admin;
  }
  getAvatar = () => {
    this._avatar = JSON.parse(localStorage.getItem("Listadmin"));
    return this._avatar[3].avatar.toString();
  }
  componentDidMount() {
    this.getUser();
    this.getAvatar();
    this.getOurShop();
  }
  logOut() {
    // localStorage.removeItem('Listadmin');
    localStorage.removeItem('AdminActive');
    window.location.pathname = '/login';
  }
  render() {
    if (localStorage.getItem("AdminActive") != null) {
      const comments = this.state.comments;
      return (
        <div>
          <div className="wrapper ">
            <div className="sidebar" data-color="purple" data-background-color="white" data-image="../assets/img/sidebar-1.jpg">
              <LeftContent></LeftContent>

            </div>
            <div className="main-panel">
              {/* Navbar */}
              <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
                <div className="container-fluid">
                  <div className="navbar-wrapper">
                    <a className="navbar-brand" >
                      {
                        this.state._ourShop.map(shop => (
                          <div className="table-responsive">
                            <table className="table">
                              <tr className=" text-primary">
                                <td>{shop.address}</td>
                                <td>{shop.numberphone}</td>
                                <td>{shop.money}</td>
                              </tr>
                            </table>
                          </div>
                        ))
                      }</a>
                  </div>
                  <button className="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="navbar-toggler-icon icon-bar" />
                    <span className="navbar-toggler-icon icon-bar" />
                    <span className="navbar-toggler-icon icon-bar" />
                  </button>
                  <div className="collapse navbar-collapse justify-content-end">
                    <form className="navbar-form">
                      <div className="input-group no-border">
                        <input type="text" className="form-control" placeholder="Search..." />
                        <button type="submit" className="btn btn-white btn-round btn-just-icon">
                          <i className="material-icons">search</i>
                          <div className="ripple-container" />
                        </button>
                      </div>
                    </form>
                    <ul className="navbar-nav">
                      <li className="nav-item">
                        <a className="nav-link">
                          <i className="material-icons">dashboard</i>
                          <p className="d-lg-none d-md-block">
                            Stats
                        </p>
                        </a>
                      </li>
                      <li className="nav-item dropdown">
                        <a className="nav-link" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i className="material-icons">notifications</i>
                          <span className="notification">{this._getCommentsTitle(comments.length)}</span>
                          <p className="d-lg-none d-md-block">
                            Some Actions
                        </p>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                          User Comment
                                            {
                            this.state.comments.map(comment => (
                              comment.user.map(us => {
                                return <a className="dropdown-item "  >{us.name}</a>
                              })

                            ))
                          }
                        </div>
                      </li>
                      <li className="nav-item dropdown">
                        <a className="nav-link" id="navbarDropdownProfile" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i className="material-icons">person</i>
                          <p className="d-lg-none d-md-block">
                            Account
                        </p>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownProfile">
                          <img src={this.getAvatar()} width="400px" className="col-sm-12 text-center dropdown-item" />
                          <a className="dropdown-item" >{this.getUser()}</a>
                          <a className="dropdown-item" >Settings</a>
                          <div className="dropdown-divider" />
                          <a onClick={() => this.logOut()} className="dropdown-item" >Log out</a>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
              {/* End Navbar */}
              <div className="content">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-8">
                      <div className="card">
                        <div className="card-header card-header-primary">
                          <h4 className="card-title">Edit Profile</h4>
                          <p className="card-category">Complete your profile</p>
                        </div>
                        <div className="card-body">
                          <form>
                            <div className="row">
                              <div className="col-md-5">
                                <div className="form-group">
                                  <label className="bmd-label-floating">Company (disabled)</label>
                                  <input type="text" className="form-control" disabled />
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div className="form-group">
                                  <label className="bmd-label-floating">Username </label>
                                  <input type="text" className="form-control" />
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label className="bmd-label-floating">Email address</label>
                                  <input type="email" className="form-control" />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="bmd-label-floating">Fist Name</label>
                                  <input type="text" className="form-control" />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="bmd-label-floating">Last Name</label>
                                  <input type="text" className="form-control" />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-12">
                                <div className="form-group">
                                  <label className="bmd-label-floating">Adress</label>
                                  <input type="text" className="form-control" />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label className="bmd-label-floating">City</label>
                                  <input type="text" className="form-control" />
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label className="bmd-label-floating">Country</label>
                                  <input type="text" className="form-control" />
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label className="bmd-label-floating">Postal Code</label>
                                  <input type="text" className="form-control" />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-12">
                                <div className="form-group">
                                  <label>About Me</label>
                                  <div className="form-group">
                                    <label className="bmd-label-floating"></label>
                                    <textarea className="form-control" rows={5} defaultValue={""} />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <button type="submit" className="btn btn-primary pull-right">Update Profile</button>
                            <div className="clearfix" />
                          </form>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card card-profile">
                        <div className="card-avatar">
                          <a href="javascript:;">
                            <img className="img" src={this.getAvatar()} />
                          </a>
                        </div>
                        <div className="card-body">
                          <h6 className="card-category text-gray">ADMIN --- COFFE ---- SHOP</h6>
                          <h4 className="card-title">{this.getUser()}</h4>
                          <p className="card-description">
                            Địa chỉ: 99 Tô Hiến Thành, Phường Phước Mỹ, Quận Sơn Trà, TP.Đà Nẵng
                        </p>
                          <p>
                            Hotline: 082 878 6789
                        </p>
                          <p>
                            Email: info@mypage.vn
                        </p>
                          <a href="javascript:;" className="btn btn-primary btn-round">View</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <footer className="footer">
                <div className="container-fluid">
                  <nav className="float-left">
                    <ul>
                      <li>
                        <a >
                          Trung Quan
                      </a>
                      </li>
                      <li>
                        <a >
                          Viet Duong
                      </a>
                      </li>
                      <li>
                        <a >
                          Thu Sang
                      </a>
                      </li>
                      <li>
                        <a >
                          Van Phat
                      </a>
                      </li>
                      <li>
                        <a >
                          Như Mai
                      </a>
                      </li>
                    </ul>
                  </nav>
                  <div className="copyright float-right">
                    <i className="material-icons">favorite</i>
                    <a target="_blank">Xóm nhà lá </a>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default AdminProfile;