import Client from '@sendgrid/client';

const sendgridMarketingApiKey = process.env.SENDGRID_EMAIL_MARKETING_API_KEY;
Client.setApiKey(sendgridMarketingApiKey);

export const sendgrid = Client;

// function getAllLists() {
//     const qs = {
//         'page_size': 100
//     };
//
//     const request = {
//         url: 'v3/marketing/lists',
//         method: 'GET',
//         qs
//     }
//
//     Client.request(request)
//         .then(([response, body]) => {
//             console.log(response.statusCode);
//             console.log(body);
//         })
//         .catch(error => {
//             console.error(error);
//         });
// }
