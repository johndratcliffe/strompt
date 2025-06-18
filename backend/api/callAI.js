import { withSessionRoute } from "../lib/session.js";
import { MongoClient, ObjectId } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME;

let cachedClient = null;

async function getMongoClient() {
  if (cachedClient) return cachedClient;
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  cachedClient = client;
  return client;
}

async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    return res.status(200).end();
  }
  let userPlan = ''
  const userSession = req.session.user
  const client = await getMongoClient()
  const db = client.db(DB_NAME)
  if (userSession) {
    try {
      const users = db.collection('users');
      const userFromDb = await users.findOne({ _id: new ObjectId(userSession.id) });
  
      if (userFromDb) {
        userPlan = userFromDb.subscription?.plan || 'free';
        if (userPlan !== 'pro') {
          const today = new Date().toISOString().split('T')[0];
          if (!userFromDb.dailyUsage || userFromDb.dailyUsage.date !== today) {
            await users.updateOne(
              { _id: new ObjectId(userSession.id) },
              { $set: { dailyUsage: { date: today, count: 1 } } }
            );
          } else {
            const newCount = userFromDb.dailyUsage.count + 1;
            if ((userPlan === 'basic' && newCount > 50) || (userPlan === 'free' && newCount > 5)) {
              return res.status(429).json({ error: "Daily limit reached" });
            }
            await users.updateOne(
              { _id: new ObjectId(userSession.id) },
              { $inc: { 'dailyUsage.count': 1 } }
            );
          }
        }
      } else {
        userPlan = 'free';
      }
    } catch (err) {
      userPlan = 'free';
    }
  } else {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const today = new Date().toISOString().split('T')[0];
    const record = await db.collection("daily_usage").findOne({ ip });
    if (record) {
      const lastUsed = record.date || today;
      if (lastUsed === today) {
        if (record.count >= 5) {
          return res.status(429).json({ error: "Daily limit reached" });
        }
        await db.collection("daily_usage").updateOne(
          { ip },
          { $inc: { count: 1 } }
        );
      } else {
        await db.collection("daily_usage").updateOne(
          { ip },
          { $set: { count: 1, date: today } }
        );
      }
    } else {
      await db.collection("daily_usage").insertOne({
        ip,
        count: 1,
        date: today
      });
    }
    userPlan = 'free';
  }

  const { input, model='llama-3.3-70b-versatile', prompt, action, custom, smartPasteOptions, userName, reprompt, result } = req.body;

  const groqApiKey = process.env.GROQ_API_KEY;

  if (!groqApiKey) {
    return res.status(500).json({ error: "Missing GROQ_API_KEY" });
  }
// ------------------ TODO: content -> messages -------------------------------------
  try {
    const messages = []
    messages.push({ role: 'system', content: `Please help ${userName || 'the user'} with the following` })
    if (action === 'recommend') {
      messages.push({ role: 'user', content: `Please recommend an action based on the text provided:\n${input}` })
      messages.push({ role: 'system', 
        content: `By actions the user means for instance reply, summarize, create notes etc. You may recommend any of these, or even, create your own action.
        Only provide actions suitable for this text (for example: email -> reply, long text -> summarize).
        Do not provide an action unsuitalbe for the test (for instance: short text -> do not recommend summarize, reply only makes sense for text that warrants a reply).
        Return the action/s in the following format: Capital first letter, separated by a ','.
        You may return any number of actions between 0 and 3.
        Do not duplicate actions or provide actions that do the same thing (for instance: summary and outline are the same).
        If no action is suitable or if the text is very brief/generic return the word 'no'` })
    } else if (action === 'keybind') {
      messages.push({ role: 'user', content: `Based on the text provided respond with the most sensible action (for instance an email -> generate the reply, 
      long text -> summarize the text, etc.). Do not give the action in your response. Only give the pure content. No framing sentces/phrases.
      Only use one of the following actions:\n` })
      let content = ''
      if (smartPasteOptions && userPlan === 'pro') {
        smartPasteOptions.forEach((option, index) => {
          if (index < smartPasteOptions.length - 1) content += option.label + ', '
          else content += option.label
        })
      } else {
        content += 'reply, summarize, create notes'
      }
      content += '\nThis is the text:\n' + input
      messages.push({ role: 'user', content })
    } else if (action === 'response') {
      if (!custom) {
        const promptMessages = {
          "Summarize": "Summarize the following text into as few words as possible without leaving out any important details and while still forming sentences. You may also use abbreviations for things people know:\n",
          "Change Tone": "Rewrite the following text into a different tone:",
          "Notes": "Create bullet point notes with as few words as possible while maintaining all important information from the following text:",
          "Rephrase": "Rephrase the following text. Do not use the same words and reorder them, instead use a different selection of words where possible:",
          "Reply": "Please reply to the folliwing text while maintaining the same tone:",
          "Refactor": "Rewrite this code in an optimized way and rename variables if sensible:",
          "Add Comments": "Add comments to the code. Do not over comment, but rather explain code that is difficult to understand:",
          "Convert Legacy Code": "Convert this legacy code to newer standards:",
          "Generate Test Case": "Create a test case for the following code:",
          "Minify/Prettify": "If this code is already minified for production, then please prettify it for development and add logging where necessary. If the code is already prettified for development and has logging etc., then please minify it for production, remove any unneccessary code such as logging:",
          "Cite": "Cite this using the APA style, use correct punctuation and italicization:",
          "Layman's Terms": "Explain this in a simple way that anyone can understand:",
          "Keypoints": "Extract the key points into bullet points. Use minimal words:",
          "Table": "Using the information provided, create a table:",
          "Chart": "Using the information provided, create a chart:",
          "SEO Optimization": "Optimize this for SEO:",
          "Reply to Customer": "Create an email or message (maybe open with hi or dear customer and closing statements) reply to the customer in a professional tone:",
          "Notes to Outreach Email": `Create an outreach email from ${userName || 'the user'} to a potential client:`,
          "Bulletpoints to Product Description": "Create a product description:",
          "Tweet Refactor": "Optimize this tweet, ensure within 280 chars. No typos, not too many emojis. Must have correct tags:",
          "YouTube Description Refactor": "Optimize this youtube description, ensure within 5000 chars. No typos, correct formatting (use paragraphs and newlines where necessary). Must have correct tags:",
          "Facebook Post Refactor": "Optimize this facebook post, ensure correct formatting (use paragraphs and newlines where necessary). Ensure proper SEO, hashtags if necessary:",
          "Hashtag Generation": "Create the most optimized hashtags:",
          "Create Youtube Description": "Based on the title create a youtube video description. Ensure it's optimized fo SEO and has relevant tags and emojis.",
          "Reply to Youtube Comment": "Given the following reply, put yourself in the shoes of the owner who uploaded a video with the title below and reply to the comment (you may use sarcasm where applicable and emojis, but be humble and friendly).",
          "Create Facebook Page Bio": "Create a facebook page bio based on the page name and category/ies (max 255 chars)\n",
          "Create Facebook Event Details": "Write a facebook event description, which includes things people might expect at the event given the details below. Ensure clean formatting and SEO",
          "Create Facebook Marketplace Description": "You are trying to sell the following item on Facebook Marketplace. Write a description for the item. Use a friendly tone. Mention key selling points, condition, and price. Keep it short.",
          "Shopify Product Description": "Create a product description for a shopify listing for the item below.",
          "WooCommerce Wordpress Product Description": "Create a product description for the following item.",
          "WooCommerce Wordpress Short Product Description": "Create a short product description for the following item.",
          "Zendesk Reply": "Reply to the customer based on the message.",
          "Freshdesk Reply": "Reply to the customer based on the message.",
          "Intercom Reply": "Reply to the customer based on the message.",
          "Salesforce Reply": "Reply to the customer based on the message.",
          "Salesforce Outreach": "Send outreach email.",
          "HubSpot Reply:": "Reply to the customer",
          "HubSpot Outreach": "Send an outreach email"
        };
        messages.push({ role: 'user', content: promptMessages[prompt] + input })
        messages.push({ role: 'system', content: "Only respond with one solution, do not give multiple options. Do not include introduction sentences/phrases, like: I'm happy to help..., here's the requested... Do not wrap the content like: ```javascript...``` or with \"\" or '' ." })
      } else if (userPlan === 'pro') {
        messages.push({ role: 'user', content: prompt })
      }
    } else if (action === 'generate') {
      messages.push({ role: 'user', content: prompt })
    }

    console.log(messages)
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${groqApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: model,
        messages
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error from Groq API:", response.status, errorText);
      return res.status(response.status).json({
        error: "Error from Groq API",
        status: response.status,
        details: errorText
      });
    }

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content ?? "No result from Groq.";
    return res.status(200).json({ output: result });
  } catch (error) {
    console.error("Error calling Groq API:", error);
    return res.status(500).json({
      error: "Failed to call Groq API",
      message: error.message
    });
  }
}

export default withSessionRoute(handler)
