export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end();
  }
  try {
    const { answer, side, name } = req.body || {};
    const ua = req.headers['user-agent'] || '';
    const referer = req.headers['referer'] || '';
    const ts = new Date().toISOString();

    if (!answer || !['yes', 'no'].includes(answer)) {
      return res.status(400).json({ error: 'invalid answer' });
    }
    if (!side || !['groom', 'bride'].includes(side)) {
      return res.status(400).json({ error: 'invalid side' });
    }
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).json({ error: 'invalid name' });
    }

    const SUPABASE_URL = "https://nxzxwwhjheuwtfbmeyst.supabase.co"; //process.env.SUPABASE_URL;
    const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE;

    if (SUPABASE_URL && SUPABASE_SERVICE_ROLE) {
      await fetch(`${SUPABASE_URL}/rest/v1/attendance_responses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_SERVICE_ROLE,
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE}`,
          Prefer: 'return=minimal',
        },
        body: JSON.stringify([
          {
            side,
            answer,
            name,
            user_agent: ua,
            referer,
            created_at: ts,
          },
        ]),
      });
    } else {
      // No DB configured; accept silently
    }

    return res.status(204).end();
  } catch (err) {
    console.error('attendance api error', err);
    return res.status(500).json({ error: 'failed to save attendance' });
  }
}

