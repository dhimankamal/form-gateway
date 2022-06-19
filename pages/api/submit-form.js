const { Client } = require('@notionhq/client');

const notion = new Client({
  auth: 'secret_JxYZPwHIxr38nf1H2zQif7n8OitCOK5CjYAICClhTLv',
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ message: `${req.method} requests are not allowed` });
  }
  try {
    console.log("try")
    const { name } = JSON.parse(req.body);
    await notion.pages.create({
      parent: {
        database_id: 'b0fa630b5b3046a3b7b160f6e1c8e923',
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: name,
              },
            },
          ],
        }
      },
    });
    res.status(201).json({ msg: 'Success' });
  } catch (error) {
    res.status(500).json({ msg: 'There was an error' });
  }
}