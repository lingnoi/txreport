const snapexEndpoints = {
  orderHistory: "https://www.snapex.com/app/Purchase/queryHistory"
};

export async function getOrderHistory(token, pageNum, pageSize, simulated) {
  const params = {
    token: token,
    pageNum: pageNum,
    pageSize: pageSize,
    simulatedTradingStatus: simulated ? 1 : 0
  };

  var formData = "";
  var i = 0;
  for (var k in params) {
    formData += i++ === 0 ? k + "=" + params[k] : "&" + k + "=" + params[k];
  }

  var request = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: formData
  };

  return fetch(snapexEndpoints.orderHistory, request);
}
