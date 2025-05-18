import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  const { unit } = req.query;

  if (!unit) {
    return res.status(400).json({ message: 'Unit number is required' });
  }

  const { data, error } = await supabase
    .from('residents')
    .select('*')
    .ilike('unit', `%${unit}%`)
    .maybeSingle();

  if (error) {
    return res.status(500).json({ message: 'Database query failed', error });
  }

  if (!data) {
    return res.status(404).json({ message: 'Resident not found' });
  }

  return res.status(200).json(data);
}
