import React, { Component } from 'react';
import { connect } from 'react-redux';
// import './App.css';

import {
	TopBar,
	TopBarLeft,
	TopBarRight,
	TopBarBrand,

	TopBarLeftSidebarButton,
	TopBarAlertDropdown,
	TopBarMegaMenuButton,
	TopBarAppDropdownButton,

	SideBar,
	SideBarList,
	SideBarItemLink,
	SideBarLink,
	SideBarHeader,

	PageWrapper,
	Container,
	ContainerFluid,
	Row,
	Col,

	Panel,
	PanelTitle,
	HeadingRow,
	PanelHeading,
	Label,
	PanelBody,

	Breadcrumb,
	BreadcrumbItem,
	HeadingTitle,

	Left,
	Right,

	NotificationList,
	notificationsRedux,

	Dropdown,
	DropdownItem,

	FooterContainer,
} from 'asab-webui-kit';


const createNotification = notificationsRedux.createNotification;

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			"dropdownOne": "1",
			"dropdownTwo": "2",
		}
	}

	componentDidMount() {
		const {dispatch} = this.props;
		///
		setTimeout(() => {
			window.$.toast({
				heading: 'Welcome to Philbert',
				text: 'Use the predefined ones, or specify a custom position object.',
				position: 'top-right',
				loaderBg:'#f0c541',
				icon: 'success',
				hideAfter: 3500,
				stack: 6
			})
			dispatch(createNotification({
				heading: "Welcome to Philbert",
				text: "Use the predefined ones, or specify a custom position object.",
				level: "warning",
				avatarSrc: "/media/philbert/img/user1.png",
			}))
		}, 3000);

		this.websocket = new WebSocket(((window.location.protocol === "https:") ? "wss://" : "ws://") + window.location.host + "/api/ws");
		this.websocket.onmessage = function (e) {
			window.$.toast({
				heading: "This is pushed from ASAB",
				text: e.data,
				position: 'top-right',
				loaderBg:'#f0c541',
				icon: 'success',
				hideAfter: 3500,
				stack: 6
			});
			console.log(e);
		};

		this.websocket.onopen = function () {
			this.send("Hi, from the client.");
		};

	}

	render() {
		const {notifications} = this.props
		return (
			<div className="App">
				<TopBar>
					<TopBarLeft>
						<TopBarBrand brandTitle="TurboCat.Io" brandImgSrc="media/teskalabs/img/logos/logo_72.png" brandHref="index.html" />
						<TopBarLeftSidebarButton />
					</TopBarLeft>
					<TopBarRight>
					<TopBarAlertDropdown
						iconBadgeText={notifications.length}>
						<li>
							<NotificationList />
						</li>
					</TopBarAlertDropdown>
					<TopBarMegaMenuButton />
					<TopBarAppDropdownButton />
					</TopBarRight>
				</TopBar>
				{/* <Dropdown /> */}
				<SideBar>
					<SideBarHeader headerTitle="Component" />
					<SideBarList listId="dashboard"
											listActive="true"
											listTitle="PRO List"
											listIconClass="zmdi-landscape">
						<SideBarItemLink linkHref="#" linkTitle="I am PRO" />
						<SideBarItemLink linkHref="#" linkTitle="I am FREE" linkActive="true" />
					</SideBarList>
					<SideBarHeader headerTitle="Second section" headerTopLine="true" />
					<SideBarList listId="commerce"
											listTitle="FREE List"
											listIconClass="zmdi-shopping-basket"
											listLabelClass="label-success"
											listLabelTitle="150">
						<SideBarItemLink linkHref="#" linkTitle="You are PRO" />
						<SideBarItemLink linkHref="#" linkTitle="You are FREE" />
					</SideBarList>
					<SideBarLink linkHref="#"
											linkIconClass="zmdi-shopping-basket"
											linkTitle="Outsider"
											linkLabelClass="label-warning"
											linkLabelTitle="9" />
				</SideBar>
				<PageWrapper >
					<ContainerFluid>
							<HeadingRow>
								<Col sm="4">
									<HeadingTitle>Panel-Wells</HeadingTitle>
								</Col>
								<Col sm="8">
									<Breadcrumb>
										<BreadcrumbItem linkHref="index.js" linkTitle="Dashboard" linkActive={false} />
										<BreadcrumbItem linkHref="javascript:void(0);" linkTitle="UI Elements" linkActive={false} />
										<BreadcrumbItem linkHref="index.js" linkTitle="Panel-Wells" linkActive={true} />
									</Breadcrumb>
								</Col>
						</HeadingRow>
						<Row>
							<Col sm="4" className="TEST">
								Column 1
							</Col>
							<Col sm="4">
								Column 2
							</Col>
							<Col sm="4">
								Column 3
							</Col>
						</Row>
						<Row>
							<Col sm="4">
								<Panel className='card-view panel-default'>
									<PanelHeading>
										<Left>
											<PanelTitle>Default Panel</PanelTitle>
										</Left>
									</PanelHeading>
									<PanelBody>
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tincidunt est vitae ultrices accumsan. Aliquam ornare lacus adipiscing, posuere lectus et, fringilla augue.</p>
									</PanelBody>
								</Panel>
							</Col>
							<Col sm="4">
								<Panel className ='card-view  panel-default'>
									<PanelHeading>
										<Left>
											<PanelTitle>Panel with label</PanelTitle>
										</Left>
										<Right>
											<Label className="test">Label</Label>
										</Right>
									</PanelHeading>
									<PanelBody>
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tincidunt est vitae ultrices accumsan. Aliquam ornare lacus adipiscing, posuere lectus et, fringilla augue.</p>
									</PanelBody>
								</Panel>
							</Col>
							<Col sm="4">
								<Panel className ='border-panel panel-default card-view'>
									<PanelHeading>
										<Left>
											<PanelTitle>Panel With Border</PanelTitle>
										</Left>
									</PanelHeading>
									<PanelBody>
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tincidunt est vitae ultrices accumsan. Aliquam ornare lacus adipiscing, posuere lectus et, fringilla augue.</p>
									</PanelBody>
								</Panel>
							</Col>
						</Row>
						<Row>
							<Col sm="4">
								<Panel className="panel-info card-view ">
									<PanelHeading>
										<Left>
											<PanelTitle className="txt-light">Info Panel</PanelTitle>
										</Left>
									</PanelHeading>
									<PanelBody>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tincidunt est vitae ultrices accumsan. Aliquam ornare lacus adipiscing, posuere lectus et, fringilla augue.
									</PanelBody>
								</Panel>
							</Col>
							<Col sm="4">
								<Panel className ='panel-warning card-view '>
									<PanelHeading>
										<Left>
											<PanelTitle className="txt-light">Warning Panel</PanelTitle>
										</Left>
									</PanelHeading>
									<PanelBody>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tincidunt est vitae ultrices accumsan. Aliquam ornare lacus adipiscing, posuere lectus et, fringilla augue.
									</PanelBody>
								</Panel>
							</Col>
							<Col sm="4">
								<Panel className ='panel-danger card-view '>
									<PanelHeading>
										<Left>
											<PanelTitle className="txt-light">Danger Panel</PanelTitle>
										</Left>
									</PanelHeading>
									<PanelBody>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tincidunt est vitae ultrices accumsan. Aliquam ornare lacus adipiscing, posuere lectus et, fringilla augue.
									</PanelBody>
								</Panel>
							</Col>
						</Row>
						<Row>
							<Col sm="4">
								<Panel className ='panel-success card-view'>
								<PanelHeading>
										<Left>
											<PanelTitle className="txt-light">Panel Success</PanelTitle>
										</Left>
									</PanelHeading>
									<PanelBody>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tincidunt est vitae ultrices accumsan. Aliquam ornare lacus adipiscing, posuere lectus et, fringilla augue.
									</PanelBody>
								</Panel>
							</Col>
							<Col sm="4">
								<Panel className ='panel-primary card-view '>
									<PanelHeading>
										<Left>
											<PanelTitle className="txt-light">Primary Panel</PanelTitle>
										</Left>
									</PanelHeading>
									<PanelBody>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tincidunt est vitae ultrices accumsan. Aliquam ornare lacus adipiscing, posuere lectus et, fringilla augue.
									</PanelBody>
								</Panel>
							</Col>
							<Col sm="4">
								<Panel className ='panel-inverse card-view '>
									<PanelHeading>
										<Left>
											<PanelTitle>Inverse Panel</PanelTitle>
										</Left>
									</PanelHeading>
									<PanelBody>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tincidunt est vitae ultrices accumsan. Aliquam ornare lacus adipiscing, posuere lectus et, fringilla augue.
									</PanelBody>
								</Panel>
							</Col>
						</Row>
						<Row>
							<Col sm="4" >
								<Dropdown value={this.state["dropdownOne"]} onItemSelect={(value) => {this.setState({"dropdownOne" : value})}}>
									<DropdownItem value="1" title="One" />
									<DropdownItem value="2" title="Two" />
									<DropdownItem value="3" title="Three" />
									<DropdownItem value="4" title="Four" />
								</Dropdown>
							</Col>
							<Col sm="4" >
								<Dropdown value={this.state["dropdownTwo"]} onItemSelect={(value) => {this.setState({"dropdownTwo" : value})}}>
									<DropdownItem value="1" title="One" />
									<DropdownItem value="2" title="Two" />
									<DropdownItem value="3" title="Three" />
									<DropdownItem value="4" title="Four" />
								</Dropdown>
							</Col>
						</Row>
					</ContainerFluid>
					<FooterContainer>
						<Row>
							<Col>
								<p>2018 © TeskaLabs WebUI Kit. Powered by Philbert</p>
							</Col>
						</Row>
					</FooterContainer>
				</PageWrapper>
			</div>
		);
	}

}

const mapStateToProps = (state) => {
	return {
		notifications: state.notifications.notifications,
	}
}
export default connect(mapStateToProps)(App);
