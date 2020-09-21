const snapexEndpoints = {
  orderHistory: "https://www.snapex.com/app/Purchase/queryHistory",
  balanceData: "https://www.snapex.com/app/Purchase/balancemargin",
  depositData: "https://www.snapex.com/app/assets/queryEntryRecordList",
  netprofitData: "https://www.snapex.com/app/assets/queryOtherList"
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

export async function getBalanceData(token) {
  const params = {
    token: token
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

export async function getDepositData(token, pageNum, pageSize) {
  const params = {
    token: token,
    pageNum: pageNum,
    pageSize: pageSize
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

  return fetch(snapexEndpoints.depositData, request);
}

export async function getNetProfitData(token, pageNum, pageSize) {
  const params = {
    token: token,
    pageNum: pageNum,
    pageSize: pageSize
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

  return fetch(snapexEndpoints.netprofitData, request);
}
