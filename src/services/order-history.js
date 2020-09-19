import HmacSHA256 from "crypto-js/hmac-sha256";

function pad(n) {
  return n < 10 ? "0" + n : n;
}

export async function getOrderHistory(apiId, apiKey) {
  const localTime = new Date();
  const utc = localTime.getTime() + localTime.getTimezoneOffset() * 60000;
  // const singaporeOffset = 8;
  // const d = new Date(utc + 3600000 * singaporeOffset);
  const d = new Date(utc);
  const timeStamp = encodeURIComponent(
    `${pad(d.getFullYear())}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
      d.getHours()
    )}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
  );
  const preSignedText = `GET\napi.snapex.com\n/v1/order/orders/history/get\nAccessKey=${apiId}&SignatureMethod=HmacSHA256&SignatureVersion=1&Timestamp=${timeStamp}`;
  const signature = encodeURIComponent(btoa(HmacSHA256(preSignedText, apiKey)));

  const url = `https://api.snapex.com/v1/orders/history/get?AccessKey=${apiId}&SignatureMethod=HmacSHA256&SignatureVersion=1&Timestamp=${timeStamp}&Signature=${signature}`;
  console.log(`fetch from: ${url}`);
  return fetch(url, {
    method: "get"
  });
}
