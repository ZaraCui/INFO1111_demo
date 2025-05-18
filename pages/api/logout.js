import { serialize } from 'cookie';

export default function handler(req, res) {
  res.setHeader(
    'Set-Cookie',
    serialize('username', '', { path: '/', maxAge: -1 })  
  );
  res.writeHead(302, { Location: '/' });
  res.end();
}
