const { Client } = require('@notionhq/client')

const notion = new Client({
  auth: process.env.AUTH_NOTIN
})

export default async function handler (req, res) {
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ message: `${req.method} requests are not allowed` })
  }
  try {
    console.log('try')
    const { id } = JSON.parse(req.body)
    await notion.pages.create({
      parent: {
        database_id: process.env.DATABASE_ID
      },
      properties: {
       
      

        
        id: {
          rich_text: [
            {
              text: {
                content: address
              }
            }
          ]
        },
       
       
       
        
      }
    })
    res.status(201).json({ msg: 'Success' })
  } catch (error) {
    res.status(500).json({ msg: 'There was an error' })
  }
}
