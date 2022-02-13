import { DateTime, Interval } from 'luxon';

export 	const getDaysAgo = (date: string) => {
	const dateTime = DateTime.fromMillis(parseInt(date, 10));
	const currentDateTime = DateTime.now();

	const i = Interval.fromDateTimes(dateTime, currentDateTime);
	const days = Math.floor(i.length('days'));

	if (days === 1) {
		return 'a day';
	}

	if (days > 1) {
		return `${days} days`;
	}

	if (days < 1) {
		const hours = Math.floor(i.length('hours'));
		if (hours === 1) {
			return 'an hour';
		}

		if (hours < 1) {
			const minutes = Math.floor(i.length('minutes'));
			if (hours === 1) {
				return 'a minute';
			}

			if (minutes < 1) {
				return 'a few seconds';
			}

			return `${minutes} minutes`;
		}

		return `${hours} hours`;
	}
};

export 	const getDaysLeft = (date: string) => {
	const dateTime = DateTime.fromMillis(parseInt(date, 10));
	const currentDateTime = DateTime.now();

	const i = Interval.fromDateTimes(currentDateTime, dateTime);

	const days = Math.floor(i.length('days'));
	if (days === 1) {
		return 'a day';
	}

	if (days < 1) {
		const hours = Math.floor(i.length('hours'));
		if (hours === 1) {
			return 'an hour';
		}

		if (hours < 1) {
			const minutes = Math.floor(i.length('minutes'));
			if (minutes === 1) {
				return 'a minute';
			}

			if (minutes < 1) {
				return 'just now';
			}

			return `${minutes} minutes`;
		}

		return `${hours} hours`;
	}

	return `${days} days`;
};

export const formatDaysLeft = (date: string) => {
	const dateTime = DateTime.fromMillis(parseInt(date, 10));
	const currentDateTime = DateTime.now();

	const i = Interval.fromDateTimes(currentDateTime, dateTime);

	const days = Math.floor(i.length('days'));

	const format = (amount: number, label: string) => ({amount, label});

	if (days === 1) {
		return format(1, 'day');
	}

	if (days < 1) {
		const hours = Math.floor(i.length('hours'));
		if (hours === 1) {
			return format(1, 'hour');
		}

		if (hours < 1) {
			const minutes = Math.floor(i.length('minutes'));
			if (minutes === 1) {
				return format(1, 'minute');
			}

			if (minutes < 1) {
				return format(1, 'minute');
			}

			return format(minutes, 'minutes');
		}

		return format(hours, 'hours');
	}

	return format(days, 'days');
};

export const getCountDown = (date: string) => {
	const dateTime = DateTime.fromMillis(parseInt(date, 10));
	const currentDateTime = DateTime.now();

	const i = Interval.fromDateTimes(currentDateTime, dateTime);
	const duration = i.toDuration();

	return duration.toFormat('d \'days : \' h\'h :\' m\'m : \' s\'s');
};
