import React, { Fragment, useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { CardActionArea, Collapse, Button } from '@material-ui/core';
import CartContext from '../../context/cart/CartContext';
import { SetUser } from '../../services/storage.service';
import LoginRegister from '../loginRegister/LoginRegister';

const useStyles = makeStyles((theme) => ({
	root: {
		// maxWidth: 300,
		// height: 'auto',
		filter: 'drop-shadow(0px 6px 6px rgba(0, 0, 0, 0.25))',
		borderRadius: '20px'
	},
	content: {
		padding: '0 10px',
		'&:last-child': {
			paddingBottom: '10px'
		}
	},
	media: {
		height: '170px',
		width: '170px',
		margin: 'auto',
		display: 'block'
	},
	defaultButton: {
		background: 'linear-gradient(315deg, #FE5858 0%, #EE9617 74%)',
		fontSize: '1.2rem',
		color: '#fff',
		padding: '6px',
		borderRadius: '20px',
		margin: '10px',

		'&:hover': {
			background: 'linear-gradient(315deg, #FE5858 0%, #EE9617 74%)',
			color: '#fff',
			outline: 'none',
			border: 'none'
		},
		'&:focus': {
			background: 'linear-gradient(315deg, #FE5858 0%, #EE9617 74%)',
			color: '#fff',
			outline: 'none',
			border: 'none'
		}
	},
	iconButton: {
		borderRadius: '20%'
	}
}));

const Product = ({ product }) => {
	const classes = useStyles();
	const [ expanded, setExpanded ] = useState(false);
	const [ open, setOpen ] = useState(false);
	const { name, price, description, stock, image } = product;
	const { cartItems, addProduct, removeProduct, increase, decrease } = useContext(CartContext);

	const isInCart = (product) => {
		return !!cartItems.find((item) => item.id === product.id);
	};

	const findQuantity = (product) => {
		const item = cartItems.find((item) => item.id === product.id);
		return item.quantity;
	};

	const formatNumber = (number) => {
		return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'INR' }).format(number);
	};

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<Fragment>
			<Card className={classes.root} raised>
				<CardActionArea onClick={handleExpandClick}>
					<img src={image} alt={name} className={classes.media} />
					<CardContent className={classes.content}>
						<Typography variant='subtitle1' color='textSecondary' align='center'>
							{stock && 'Avaliable in Stock'}
						</Typography>
						<Typography variant='h6' color='textSecondary' align='center'>
							{name}
						</Typography>
						<Typography
							variant='subtitle1'
							color='textPrimary'
							align='justify'
							display='block'
							style={{ marginLeft: '15px' }}
						>
							{formatNumber(price)}
						</Typography>
					</CardContent>
				</CardActionArea>
				<Collapse in={expanded} timeout='auto' unmountOnExit>
					<CardContent className={classes.content}>
						<Typography paragraph>{description}</Typography>
					</CardContent>
				</Collapse>
				<CardActions disableSpacing>
					{!isInCart(product) ? (
						<Button
							variant='contained'
							color='secondary'
							fullWidth
							onClick={() => {
								if (SetUser.getUser()) addProduct(product);
								else setOpen(true);
							}}
							className={classes.defaultButton}
						>
							ADD
						</Button>
					) : (
						<Fragment>
							<IconButton
								variant='contained'
								color='secondary'
								onClick={() => {
									if (SetUser.getUser()) {
										if (findQuantity(product) !== 1) decrease(product, true);
										else removeProduct(product);
									} else setOpen(true);
								}}
								className={clsx(classes.iconButton, classes.defaultButton)}
							>
								<RemoveIcon />
							</IconButton>

							<div
								style={{
									display: 'inline-block',
									width: '100%',
									textAlign: 'center',
									fontSize: '1.2rem'
								}}
							>
								{findQuantity(product)}
							</div>
							<IconButton
								variant='outlined'
								color='secondary'
								onClick={() => {
									if (SetUser.getUser()) increase(product, true);
									else setOpen(true);
								}}
								className={clsx(classes.iconButton, classes.defaultButton)}
								style={{
									marginLeft: 'auto'
								}}
							>
								<AddIcon />
							</IconButton>
						</Fragment>
					)}
				</CardActions>
			</Card>
			{open && <LoginRegister handleClose={() => setOpen(false)} open={open} />}
		</Fragment>
	);
};

export default Product;
