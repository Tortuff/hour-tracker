async function login(req, res) {
  res.status(401).json({ error: 'not_authorized' });
}

export { login };
