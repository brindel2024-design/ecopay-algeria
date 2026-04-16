const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const auth = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer '))
      return res.status(401).json({ error: 'Token manquant' });
    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { rows } = await pool.query(
      'SELECT id,phone,full_name,kyc_status,kyc_level,is_active,is_locked FROM users WHERE id=$1',
      [decoded.userId]
    );
    if (!rows.length) return res.status(401).json({ error: 'Utilisateur introuvable' });
    const user = rows[0];
    if (!user.is_active) return res.status(403).json({ error: 'Compte désactivé' });
    if (user.is_locked) return res.status(403).json({ error: 'Compte verrouillé' });
    req.user = user; next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') return res.status(401).json({ error: 'Token expire' });
    next(err);
  }
};
module.exports = auth;