export async function getProduct(req, res) {
  console.log(req.params.id);
  res.sendStatus(200);
}
