export const slideInRight = {
	'@-webkit-keyframes slide-in-right': {
		from: {
			webkitTransform: 'translateX(1000px)',
			transform: 'translateX(1000px)',
			opacity: 0,
		},
		to: {
			webkitTransform: 'translateX(0)',
			transform: 'translateX(0)',
			opacity: 1,
		},
	},
	'@keyframes slide-in-right': {
		from: {
			webkitTransform: 'translateX(1000px)',
			transform: 'translateX(1000px)',
			opacity: 0,
		},
		to: {
			webkitTransform: 'translateX(0)',
			transform: 'translateX(0)',
			opacity: 1,
		},
	},
	slideInRight: {
		webkitAnimation: '$slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
		animation: '$slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
	},
};

export const slideInLeft = {
	'@-webkit-keyframes slide-in-left': {
		from: {
			webkitTransform: 'translateX(-1000px)',
			transform: 'translateX(-1000px)',
			opacity: 0,
		},
		to: {
			webkitTransform: 'translateX(0)',
			transform: 'translateX(0)',
			opacity: 1,
		},
	},
	'@keyframes slide-in-left': {
		from: {
			webkitTransform: 'translateX(-1000px)',
			transform: 'translateX(-1000px)',
			opacity: 0,
		},
		to: {
			webkitTransform: 'translateX(0)',
			transform: 'translateX(0)',
			opacity: 1,
		},
	},
	slideInLeft: {
		webkitAnimation: '$slide-in-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
		animation: '$slide-in-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
	},
};

export const slideOutRight = {
	'@-webkit-keyframes slide-out-right': {
		from: {
			webkitTransform: 'translateX(0)',
			transform: 'translateX(0)',
			opacity: 1,
		},
		to: {
			webkitTransform: 'translateX(1000px)',
			transform: 'translateX(1000px)',
			opacity: 0,
		},
	},
	'@keyframes slide-out-right': {
		from: {
			webkitTransform: 'translateX(0)',
			transform: 'translateX(0)',
			opacity: 1,
		},
		to: {
			webkitTransform: 'translateX(1000px)',
			transform: 'translateX(1000px)',
			opacity: 0,
		},
	},
	slideOutRight: {
		webkitAnimation: '$slide-out-right 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both',
		animation: '$slide-out-right 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both',
	},
};

export const slideOutLeft = {
	'@-webkit-keyframes slide-out-left': {
		from: {
			webkitTransform: 'translateX(0)',
			transform: 'translateX(0)',
			opacity: 1,
		},
		to: {
			webkitTransform: 'translateX(-1000px)',
			transform: 'translateX(-1000px)',
			opacity: 0,
		},
	},
	'@keyframes slide-out-left': {
		from: {
			webkitTransform: 'translateX(0)',
			transform: 'translateX(0)',
			opacity: 1,
		},
		to: {
			webkitTransform: 'translateX(-1000px)',
			transform: 'translateX(-1000px)',
			opacity: 0,
		},
	},
	slideOutLeft: {
		webkitAnimation: '$slide-out-left 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both',
		animation: '$slide-out-left 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both',
	},
};

export const fadeOut = {
	'@-webkit-keyframes fade-out': {
		from: {
			opacity: 1,
		},
		to: {
			opacity: 0,
		},
	},
	'@keyframes fade-out': {
		from: {
			opacity: 1,
		},
		to: {
			opacity: 0,
		},
	},
	fadeOut: {
		webkitAnimation: '$fade-out 0.5s ease-out both',
		animation: '$fade-out 0.5s ease-out both',
	},
};
