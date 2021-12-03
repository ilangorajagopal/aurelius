import { sendgrid } from './sendgrid';

export async function addNewUserToContacts(user) {
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

	await sendgrid.request({
		url: `/v3/marketing/contacts`,
		method: 'PUT',
		body: data,
	});
}
