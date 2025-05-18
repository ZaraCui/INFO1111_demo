import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  const { data, error } = await supabase
    .from('funds')
    .select('*');

  if (error) {
    return res.status(500).json({ message: 'Database query failed', error });
  }

  const result = {};
  data.forEach(entry => {
    result[entry.type] = entry.amount;
  });

  res.status(200).json(result);
}
