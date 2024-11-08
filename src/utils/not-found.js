/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const notFoundRoute = (req, res) => {
  res.status(404).json({ error: 'not_found', message: `Page for path "${req.path}" not found` });
};
