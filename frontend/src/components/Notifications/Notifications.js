// import React from 'react';
// import PropTypes from 'prop-types';

// import { notificationsActions } from '../../../_actions';

// const variantIcon = {
// 	success: CheckCircleIcon,
// 	warning: WarningIcon,
// 	error: ErrorIcon,
// 	info: InfoIcon,
// };

// function MySnackbarContentWrapper(props) {
// 	const classes = useStyles1();
// 	const { className, message, onClose, variant, ...other } = props;
// 	const Icon = variantIcon[variant];

// 	return (
// 		<SnackbarContent
// 			className={(classes[variant], className)}
// 			aria-describedby='client-snackbar'
// 			message={
// 				<span id='client-snackbar' className={classes.message}>
// 					<Icon className={clsx(classes.icon, classes.iconVariant)} />
// 					{message}
// 				</span>
// 			}
// 			action={[
// 				<IconButton
// 					key='close'
// 					aria-label='close'
// 					color='inherit'
// 					onClick={onClose}>
// 					<CloseIcon className={classes.icon} />
// 				</IconButton>,
// 			]}
// 			{...other}
// 		/>
// 	);
// }

// MySnackbarContentWrapper.propTypes = {
// 	className: PropTypes.string,
// 	message: PropTypes.string,
// 	onClose: PropTypes.func,
// 	variant: PropTypes.string.isRequired,
// };

// export const Notification = ({ notifications = {}, dispatch }) => {
// 	const { isOpen, type, message } = notifications;
// 	const onClose = () => {
// 		dispatch(notificationsActions.clear());
// 	};

// 	if (!isOpen && !type) return null;

// 	return (
// 		<>
// 			<Snackbar
// 				anchorOrigin={{
// 					vertical: 'bottom',
// 					horizontal: 'left',
// 				}}
// 				open={isOpen}
// 				autoHideDuration={10000}
// 				onClose={onClose}>
// 				<MySnackbarContentWrapper
// 					onClose={onClose}
// 					variant={type}
// 					message={message}
// 				/>
// 			</Snackbar>
// 		</>
// 	);
// };
