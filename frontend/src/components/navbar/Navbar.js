import React, { useState } from 'react';
import { makeStyles, createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import ListItemText from '@material-ui/core/ListItemText';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { NavLink, useHistory } from 'react-router-dom';
import { SetUser } from '../../services/storage.service';
import LoginRegister from '../loginRegister/LoginRegister';
import { useContext } from 'react';
import ProductContext from '../../context/product/ProductContext';
import ContactUs from '../contact/ContactUs';
import CartContext from '../../context/cart/CartContext';

const customTheme = createMuiTheme({
	palette: {
		primary: {
			main: '#fff'
		},
		divider: '#000',
		action: {
			// active: '#000',
			// hover: '#000',
			// selected: '#000',
			// disabled: '#000',
			// disabledBackground: '#000',
		},
		text: {
			main: '#123214',
			// secondary: '#fff',
			disabled: '#fff',
			hint: '#fff',
			icon: '#110000'
		},
		background: {
			default: '#fff',
			paper: '#fff'
		}
	}
});

const useStyles = makeStyles((theme) => ({
	grow: {
		flexGrow: 1
	},
	title: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block'
		}
	},

	iconButton: {
		fontSize: '1em',
		color: '#2B2F4C',
		marginRight: '30px'
	},
	icons: {
		marginRight: '5px'
	},
	link: {
		color: '#f55d2c'
	}
}));

const CustomListItem = withStyles({
	root: {
		textAlign: 'left',
		width: 'auto',
		'&$selected': {
			backgroundColor: '#fff',
			color: '#f55d2c'
		},
		'&$selected:hover': {
			backgroundColor: '#fff',
			color: '#f55d2c'
		},
		'&:hover': {
			backgroundColor: '#fff',
			color: '#f55d2c'
		}
	},
	selected: {}
})(ListItem);

const CustomButton = withStyles({
	root: {
		// height: '90%',
		fontSize: '1.5em',
		padding: '0.3rem 2rem',
		color: '#fff',
		border: 'none',
		outline: 'none',
		textTransform: 'none',
		borderRadius: '30px',
		background: 'linear-gradient(315deg, #FE5858 0%, #EE9617 74%)',
		'&:hover': {
			boxShadow: 'none',
			border: 'none',
			background: 'linear-gradient(315deg, #FE5858 0%, #EE9617 74%)',
			outline: 'none'
		},
		'&:active': {
			boxShadow: 'none',
			border: 'none',
			background: 'linear-gradient(315deg, #FE5858 0%, #EE9617 74%)',
			outline: 'none'
		},
		'&:focus': {
			border: 'none',
			background: 'linear-gradient(315deg, #FE5858 0%, #EE9617 74%)',
			outline: 'none'
		}
	}
})(Button);

const StyledBadge = withStyles((theme) => ({
	badge: {
		border: `2px solid ${theme.palette.background.paper}`,
		padding: '0 4px',
		// fontSize: '1em',
		fontWeight: 'bolder'
		// marginLeft: '6px'
	}
}))(Badge);

const Navbar = () => {
	const classes = useStyles();
	const { getProducts } = useContext(ProductContext);
	const { cartItems } = useContext(CartContext);
	const [ selectedIndex, setSelectedIndex ] = useState(0);
	const [ open, setOpen ] = useState({ login: false, contactUs: false });

	const history = useHistory();

	const handleListItemClick = (event, index) => {
		setSelectedIndex(index);
	};

	const handleClick = () => {
		if (SetUser.getUser()) {
			history.push('/cart');
		} else {
			setOpen({ ...open, login: true });
		}
	};

	return (
		<MuiThemeProvider theme={customTheme}>
			<div className={classes.grow}>
				<AppBar position='static'>
					<Toolbar>
						<List component='nav' style={flexContainer}>
							<CustomListItem
								button
								key='Home'
								selected={selectedIndex === 0}
								onClick={(event) => {
									handleListItemClick(event, 0);
									getProducts();
								}}
							>
								<NavLink to='/home' activeClassName={classes.link}>
									<ListItemText style={{ textAlign: 'left', paddingLeft: '10px' }} primary='Home' />
								</NavLink>
							</CustomListItem>
							<CustomListItem
								button
								key='Checkout'
								selected={selectedIndex === 1}
								onClick={(event) => {
									handleListItemClick(event, 1);
									if (!SetUser.getUser()) setOpen({ ...open, login: true });
								}}
							>
								<NavLink
									to={open.login ? '/home' : '/checkout'}
									activeClassName={!open.login && classes.link}
								>
									<ListItemText
										style={{ textAlign: 'left', paddingLeft: '10px' }}
										primary='Checkout'
									/>
								</NavLink>
							</CustomListItem>
							<CustomListItem
								button
								key='Contact Us'
								selected={selectedIndex === 2}
								onClick={(event) => {
									handleListItemClick(event, 2);
									setOpen({ ...open, contactUs: true });
								}}
							>
								<NavLink to='#'>
									<ListItemText
										style={{ textAlign: 'left', paddingLeft: '10px' }}
										primary='Contact Us'
									/>
								</NavLink>
							</CustomListItem>
						</List>
						<div className={classes.grow} />
						<CustomButton
							onClick={handleClick}
							startIcon={
								<StyledBadge badgeContent={cartItems.length}>
									<ShoppingCartIcon style={{ marginRight: '5px' }} />
								</StyledBadge>
							}
						>
							<span style={{ marginLeft: '10px' }}>Cart</span>
						</CustomButton>
					</Toolbar>
				</AppBar>
			</div>
			{open.login && <LoginRegister handleClose={() => setOpen({ ...open, login: false })} open={open.login} />}
			{open.contactUs && (
				<ContactUs handleClose={() => setOpen({ ...open, contactUs: false })} open={open.contactUs} />
			)}
		</MuiThemeProvider>
	);
};

const flexContainer = {
	display: 'flex',
	flexDirection: 'row',
	padding: 0
};

export default Navbar;
