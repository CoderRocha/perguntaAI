/* eslint-env node */
export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  const apiKey = process.env.VITE_OPENAI_API_KEY
  const apiUrl = process.env.VITE_OPENAI_API_URL

  if (!apiKey || !apiUrl) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'API not configured' }),
    }
  }

  try {
    const body = JSON.parse(event.body)

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()

    return {
      statusCode: response.status,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }
  } catch {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to reach OpenAI' }),
    }
  }
}
