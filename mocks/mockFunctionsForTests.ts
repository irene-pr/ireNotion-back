const mockResponse = () => {
  const res: any = {};

  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockRequirements = (id: number | string) => {
  const req: any = {};

  req.params = jest.fn().mockReturnValue(id);
  return req;
};

module.exports = { mockResponse, mockRequirements };
