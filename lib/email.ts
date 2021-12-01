import { sendgrid } from './sendgrid';

export function addNewUserToContacts(user) {
	const { email, name } = user;
	const [first_name, last_name] =
		name.split(' ').length > 1 ? name.split(' ') : [name, ''];
	const data = {
		list_ids: ['5a681261-e0e5-42ec-9eeb-ea514fc5b4ba'],
		contacts: [
			{
				email,
				first_name,
				last_name,
			},
		],
	};

	const request = {
		url: `/v3/marketing/contacts`,
		method: 'PUT',
		body: data,
	};

	// @ts-ignore
	sendgrid
		.request(request)
		.then(() => {
			console.log('Added new user to list...');
		})
		.catch((error) => {
			console.error(error);
		});
}
