import { SendEmailCommand, SESClient } from "@aws-sdk/client-ses";

const sesClient = new SESClient({ region: process.env.REGION });

async function sendMail(event, context) {
  const record = event.Records[0];
  console.log('record processing', record);

  const email = JSON.parse(record.body);
  const { subject, body, recipient } = email;

  const params = {
    Destination: {
      ToAddresses: [recipient],
    },
    Message: {
      Body: {
        Text: {
          Charset: "UTF-8",
          Data: body,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: "spb.swetlana@gmail.com",
  };

  try {
    const result = await sesClient.send(new SendEmailCommand(params));
    console.log(result);
    return result;
  } catch (err) {
    console.error(err, err.stack);
  }
}

export const handler = sendMail;
