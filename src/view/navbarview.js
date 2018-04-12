/*
__/\\\________/\\\_____/\\\\\\\\\_____/\\\\\\\\\\\__/\\\________/\\\__/\\\\\\\\\\\\\\\_
 _\/\\\_______\/\\\___/\\\\\\\\\\\\\__\/////\\\///__\/\\\_______\/\\\_\/\\\///////////__
  _\/\\\_______\/\\\__/\\\/////////\\\_____\/\\\_____\//\\\______/\\\__\/\\\_____________
   _\/\\\\\\\\\\\\\\\_\/\\\_______\/\\\_____\/\\\______\//\\\____/\\\___\/\\\\\\\\\\\_____
    _\/\\\/////////\\\_\/\\\\\\\\\\\\\\\_____\/\\\_______\//\\\__/\\\____\/\\\///////______
     _\/\\\_______\/\\\_\/\\\/////////\\\_____\/\\\________\//\\\/\\\_____\/\\\_____________
      _\/\\\_______\/\\\_\/\\\_______\/\\\_____\/\\\_________\//\\\\\______\/\\\_____________
       _\/\\\_______\/\\\_\/\\\_______\/\\\__/\\\\\\\\\\\______\//\\\_______\/\\\\\\\\\\\\\\\_
        _\///________\///__\///________\///__\///////////________\///________\///////////////__

	HAIVE web application - GUI Version 0.0.2 (OO)
	For Molcure product
	Base sketch by Lisan
	http://molcure.com
	Author: Lysandre Debut
*/

import React from 'react';
import {showAssetStore, showDashboard, showHaiveSelectionPage, showPage} from '../actions/focusedActions'
import {connect} from "react-redux";
import {NavbarStructure} from "../structure/Navbar";
const gv = require('../../const/global');


let navbarModel;
let sections;

/**
 * Navbar view component
 */
export class Navbar extends React.Component {
	constructor(props){
		super(props);
		navbarModel = new NavbarStructure();
		sections = navbarModel.getSections();
	}


	render() {
		return(
			<section className="vbox">
				<NavbarHeader />
                <section>
					<div className="lt nav-user hidden-xs pos-rlt">
						<div className="nav-avatar pos-rlt">
							<a href="#" className="thumb-sm avatar animated fadeIn" data-toggle="dropdown">
								<img src="images/lara.jpg" alt="" className=""/>
								<span className="caret caret-white"></span>
							</a>
							<UserDropdownMenu />
							<NavbarProfilePicture />
						</div>
						<NavbarNotificationDropdown />
					</div>
					<NavbarExtendedSidebar/>
				</section>
				<NavbarFooter />
			</section>
		);
    }
}

/**
 * Self-exlanatory
 */
class NavbarProfilePicture extends React.Component{
	render(){
		return(
			<div className="visible-xs m-t m-b">
				<a href="#" className="h3">Swedish Girl</a>
				<p><i className="fa fa-map-marker"></i> Stockholm, Sweden</p>
			</div>
		);
	}
}

/**
 * Self-exlanatory
 */
class UserDropdownMenu extends React.Component{
	render(){
		return(
			<ul className="dropdown-menu m-t-sm animated fadeInRight">
				<span className="arrow top"></span>

				<li>
					<a href="#">Settings</a>
				</li>

				<li>
					<a href="profile.html">Profile</a>
				</li>

				<li>
					<a href="#">
						<span className="badge bg-danger pull-right">3</span>
						Notifications
					</a>
				</li>

				<li className="divider"></li>

				<li>
					<a href="docs.html">Help</a>
				</li>

				<li>
					<a href="signin.html">Logout</a>
				</li>

			</ul>
		);
	}
}

/**
 * Self-exlanatory
 */
class NavbarHeader extends React.Component{
	render(){
		return(
			<header className="bg-danger dker nav-bar">
				<a className="btn btn-link visible-xs" data-toggle="className:nav-off-screen" data-target="#nav">
					<i className="fa fa-bars"></i>
				</a>

				<a href="#" className="nav-brand" data-toggle="fullscreen">
					<img src="images/slm.png"></img>
				</a>


				<a className="btn btn-link visible-xs" data-toggle="className:show" data-target=".nav-user">
					<i className="fa fa-comment-o"></i>
				</a>
			</header>
		);
	}
}

/**
 * Self-exlanatory
 */
class NavbarFooter extends React.Component{
	render(){
		return(
			<footer className="footer bg-gradient hidden-xs text-center fa-fa-bars-bootstrap">
				<a href="modal.lockme.html" data-toggle="ajaxModal" className="btn btn-sm btn-link hide">
					<i className="fa fa-power-off"></i>
				</a>

				<a href="#nav" data-toggle="className:nav-vertical" className="btn btn-sm btn-link">
					<i className="fa fa-bars"></i>
				</a>
			</footer>
		);
	}
}

/**
 * All the items that make up the Navbar.
 */
@connect((store) => {
    return{
        focusedPages : store.focusedPages
    }
})
class NavbarItem extends React.Component{
	constructor(props){
		super(props);
        this.showPage = this.showPage.bind(this);
	}

    showPage(pageTitle){
        console.log("Showing page", pageTitle);
        console.log(window);
        switch(pageTitle){
			case gv.focusablePages.DASHBOARD:
				this.props.dispatch(showDashboard());
				break;
            case gv.focusablePages.HAIVE_SELECT:
                this.props.dispatch(showHaiveSelectionPage());
                break;
            case gv.focusablePages.ASSET_STORE:
                this.props.dispatch(showAssetStore());
                break;
        }
    }

	render(){
		if(this.props.focusedPages.page === this.props.link){
			return(
				<li className="active" onClick={showHaiveSelectionPage}>
					<a>
						<i className={"fa fa-"+this.props.icon}></i>
						<span>{this.props.content}</span>
					</a>
				</li>
			);
		}else{
			return(
				<li onClick={() => this.showPage(this.props.link)}>
					<a>
						<i className={"fa fa-"+this.props.icon}></i>
						<span>{this.props.content}</span>
					</a>
				</li>
			);
		}

	}
}

/**
 * Displayed when the user extends the sidebar by clicking the bottom button.
 */
class NavbarExtendedSidebar extends React.Component{
	constructor(props){
		super(props);
		this.updateState = this.updateState.bind(this);
	}
	updateState(state, value){
		this.setState({state:value});
	}

	render(){
		// console.log("Refreshed navbar");
		return(
			<nav className="nav-primary hidden-xs">
				<ul className="nav">
					{sections.map(function(section, index){
						if(section.getIcon() != undefined){
							return <NavbarItem key={index} active={section.getActive()} link={section.getTitle()} icon={section.getIcon()} content={section.getTitle()} func={navbarModel.handler} />

						}
					})}
				</ul>
			</nav>
		);
	}
}

/**
 * Displayed when the user requires clicks on the Notification dropdown icon.
 */
class NavbarNotificationDropdown extends React.Component{
	render(){
		return(
			<div className="nav-msg">

				<a href="#" className="dropdown-toggle" data-toggle="dropdown">
					<b className="badge badge-white count-n">2</b>
				</a>

				<section className="dropdown-menu m-l-sm pull-left animated fadeInRight">

					<div className="arrow left"></div>

					<section className="panel bg-white">
						<header className="panel-heading">
							<strong>You have <span className="count-n">2</span> notifications</strong>
						</header>

						<div className="list-group">
							<a href="#" className="media list-group-item">
								<span className="pull-left thumb-sm">
									<img src="images/lara.jpg" alt="John said" className="img-circle"/>
								</span>

								<span className="media-body block m-b-none">
									Cell panning protocol has finished<br/>
									<small className="text-muted">28 Aug 13</small>
								</span>
							</a>

							<a href="#" className="media list-group-item">
								<span className="media-body block m-b-none">
									Firmware of Dispensing Module has updated to 1.2<br/>
									<small className="text-muted">27 Aug 13</small>
								</span>
							</a>
						</div>

						<footer className="panel-footer text-sm">
							<a href="#" className="pull-right"><i className="fa fa-cog"></i></a>
							<a href="#">See all the notifications</a>
						</footer>
					</section>
				</section>
			</div>
		);
	}
}
